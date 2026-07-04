import { NextResponse } from 'next/server';
import { AI_KNOWLEDGE } from '@/lib/ai-knowledge';

export async function POST(request: Request) {
  try {
    const { messages, lang = 'uk' } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array.' },
        { status: 400 }
      );
    }

    const groqKey = process.env.GROQ_API_KEY;
    const openRouterKey = process.env.OPENROUTER_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    // Extract correct system instruction based on lang
    const systemPrompt = AI_KNOWLEDGE[lang as 'uk' | 'en'] || AI_KNOWLEDGE.uk;

    // ----------------------------------------------------
    // PROVIDER 1: GROQ (Completely Free Tier, Blazing Fast)
    // ----------------------------------------------------
    if (groqKey) {
      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg: any) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${groqKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile', // Smartest model on Groq, fully free within limits
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content;
        if (replyText) {
          return NextResponse.json({ role: 'model', content: replyText });
        }
      } else {
        const err = await response.json();
        console.error('Groq API Error:', err);
      }
    }

    // ----------------------------------------------------
    // PROVIDER 2: OPENROUTER (Generous Free Models)
    // ----------------------------------------------------
    if (openRouterKey) {
      const formattedMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((msg: any) => ({
          role: msg.role === 'assistant' ? 'assistant' : 'user',
          content: msg.content
        }))
      ];

      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openRouterKey}`,
          'HTTP-Referer': 'https://sitenest.work', // Optional, for OpenRouter analytics
          'X-Title': 'SiteNest Agency'
        },
        body: JSON.stringify({
          // The most stable and extremely cheap paid model
          model: 'meta-llama/llama-3.1-8b-instruct', 
          messages: formattedMessages,
          temperature: 0.7,
          max_tokens: 800
        })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.choices?.[0]?.message?.content;
        if (replyText) {
          return NextResponse.json({ role: 'model', content: replyText });
        }
      } else {
        const err = await response.json();
        console.error('OpenRouter API Error:', err);
        return NextResponse.json(
          { role: 'model', content: `Помилка OpenRouter: ${err.error?.message || 'Невідома помилка'}` }
        );
      }
    }

    // ----------------------------------------------------
    // PROVIDER 3: DIRECT GEMINI API (Fallback/Standard)
    // ----------------------------------------------------
    if (geminiKey) {
      const formattedContents = messages.map((msg: any) => {
        const role = msg.role === 'assistant' ? 'model' : 'user';
        return {
          role,
          parts: [{ text: msg.content }]
        };
      });

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: formattedContents,
            systemInstruction: {
              parts: [{ text: systemPrompt }]
            },
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            }
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return NextResponse.json({ role: 'model', content: replyText });
        }
      } else {
        const errorData = await response.json();
        console.error('Gemini API Error:', errorData);

        // Handle credit/quota depletion gracefully
        if (response.status === 429 || errorData?.error?.message?.includes('credits')) {
          const quotaResponses: Record<string, string> = {
            uk: 'На жаль, ліміти запитів ШІ-асистента на сьогодні вичерпано або на балансі закінчились кошти. Будь ласка, напишіть нам напряму на пошту sitenest.ua@gmail.com або зателефонуйте в месенджерах!',
            en: 'Sorry, our AI assistant\'s request limits or credits are temporarily depleted. Please contact us directly at sitenest.ua@gmail.com or via messengers!'
          };
          return NextResponse.json({
            role: 'model',
            content: quotaResponses[lang] || quotaResponses.uk
          });
        }
      }
    }

    // ----------------------------------------------------
    // FALLBACK IF NO KEYS ARE SET OR ALL PROVIVDERS FAILED
    // ----------------------------------------------------
    const mockResponses: Record<string, string> = {
      uk: 'Привіт! На даний момент зв\'язок з ШІ тимчасово обмежений. Будь ласка, напишіть нам напряму на пошту sitenest.ua@gmail.com або зв\'яжіться в месенджерах!',
      en: 'Hello! AI chat is temporarily unavailable. Please reach out to us directly at sitenest.ua@gmail.com or contact us via messengers!'
    };
    return NextResponse.json({
      role: 'model',
      content: mockResponses[lang] || mockResponses.uk
    });

  } catch (error: any) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
