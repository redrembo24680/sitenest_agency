'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Wallet, 
  Coins, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  RefreshCw, 
  Award, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { Link } from '@/components/Link';
import confetti from 'canvas-confetti';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MagneticButton } from '@/components/MagneticButton';

// Standard ERC-721 and Claim ABI
const nftAbi = [
  {
    name: 'balanceOf',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
  },
  {
    name: 'mint',
    type: 'function',
    stateMutability: 'payable',
    inputs: [],
    outputs: [],
  },
  {
    name: 'claim',
    type: 'function',
    stateMutability: 'payable',
    inputs: [
      { name: 'receiver', type: 'address' },
      { name: 'quantity', type: 'uint256' },
      { name: 'currency', type: 'address' },
      { name: 'pricePerToken', type: 'uint256' },
      {
        name: 'allowlistProof',
        type: 'tuple',
        components: [
          { name: 'proof', type: 'bytes32[]' },
          { name: 'quantityLimitPerAddress', type: 'uint256' },
          { name: 'pricePerToken', type: 'uint256' },
          { name: 'currency', type: 'address' },
        ],
      },
      { name: 'data', type: 'bytes' },
    ],
    outputs: [],
  },
] as const;

const NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS || '';

export default function Web3Client() {
  const { t, lang } = useLanguage();
  
  // Real Web3 States via Wagmi
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  // Read balance from the real NFT contract if the address is configured
  const { data: balanceData, refetch: refetchBalance } = useReadContract({
    address: NFT_CONTRACT_ADDRESS as `0x${string}`,
    abi: nftAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!(NFT_CONTRACT_ADDRESS && address),
    }
  });

  const nftBalance = balanceData ? Number(balanceData) : 0;
  
  // Local simulated state fallback (if contract address is not set in env)
  const [isSimulatedMinted, setIsSimulatedMinted] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatusText, setMintStatusText] = useState('');
  const [artMode, setArtMode] = useState(false);

  const isWalletConnected = isConnected;
  const isMinted = NFT_CONTRACT_ADDRESS ? (nftBalance > 0) : isSimulatedMinted;
  const walletAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '0x000...0000';

  // Interactive Calculator States
  const [selectedType, setSelectedType] = useState<'landing' | 'corporate' | 'ecommerce'>('corporate');
  const [devopsAddon, setDevopsAddon] = useState(false);
  const [seoAddon, setSeoAddon] = useState(false);
  const [apiAddon, setApiAddon] = useState(false);

  // 3D Card Hover Effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardRotate, setCardRotate] = useState({ x: 0, y: 0 });

  // Refetch NFT balance automatically when user returns to this browser tab
  useEffect(() => {
    const handleFocus = () => {
      if (isConnected && NFT_CONTRACT_ADDRESS) {
        refetchBalance();
      }
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isConnected, refetchBalance]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalize values to max 15 degrees tilt
    const rotateX = -(y / (rect.height / 2)) * 12;
    const rotateY = (x / (rect.width / 2)) * 12;
    
    setCardRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setCardRotate({ x: 0, y: 0 });
  };

  // NFT Minting or Claim execution
  const mintNFT = async () => {
    if (!isWalletConnected || isMinted || isMinting) return;
    
    if (!NFT_CONTRACT_ADDRESS) {
      // Run simulation fallback
      setIsMinting(true);
      
      const steps = [
        lang === 'en' ? 'Initializing transaction...' : 'Ініціалізація транзакції...',
        lang === 'en' ? 'Minting NFT on Base network...' : 'Мінтинг NFT в мережі Base...',
        lang === 'en' ? 'Confirming block...' : 'Підтвердження блоку...',
        'Success!'
      ];

      setMintStatusText(steps[0]);

      setTimeout(() => {
        setMintStatusText(steps[1]);
        setTimeout(() => {
          setMintStatusText(steps[2]);
          setTimeout(() => {
            setIsMinting(false);
            setIsSimulatedMinted(true);
            setMintStatusText('');
            
            // Confetti celebration
            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 }
            });
          }, 1000);
        }, 1000);
      }, 1000);
      return;
    }

    // Real Minting logic - Redirect to Manifold Page
    try {
      setIsMinting(true);
      setMintStatusText(lang === 'en' ? 'Opening Manifold Page...' : 'Відкриття сторінки Manifold...');
      
      window.open('https://manifold.xyz/@sitenest/id/4031709424', '_blank');
      
      // Reset loading state after short delay
      setTimeout(() => {
        setIsMinting(false);
        setMintStatusText('');
      }, 2000);
    } catch (err) {
      console.error('Redirect failed:', err);
      setIsMinting(false);
      setMintStatusText('');
    }
  };

  // Calculate project cost
  const getBasePrice = () => {
    switch (selectedType) {
      case 'landing': return 150;
      case 'corporate': return 250;
      case 'ecommerce': return 400;
    }
  };

  const calculateTotal = () => {
    let total = getBasePrice();
    if (devopsAddon) total += 50;
    if (seoAddon) total += 100;
    if (apiAddon) total += 100;
    return total;
  };

  const totalOriginal = calculateTotal();
  const totalWithDiscount = Math.round(totalOriginal * 0.85);

  return (
    <div className="page-fade-enter">
      {/* HERO SECTION */}
      <section className="services-hero">
        <div className="container">
          <span className="section-subtitle">{t.web3.subtitle}</span>
          <h1 className="section-title">
            {t.web3.title} <span>{t.web3.titleHighlight}</span>
          </h1>
          <p className="hero-desc" style={{ margin: '0 auto 2.5rem auto' }}>
            {t.web3.desc}
          </p>
        </div>
      </section>

      {/* INTERACTIVE WORKSPACE SECTION */}
      <section className="section-padding" style={{ paddingTop: '1rem' }}>
        <div className="container">
          <div className="web3-interactive-grid">
            
            {/* LEFT: 3D NFT Pass Card */}
            <div className="web3-visual-wrap">
              <div 
                ref={cardRef}
                className={`web3-nft-card ${artMode ? 'art-mode-active' : ''}`}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  transform: `perspective(1000px) rotateX(${cardRotate.x}deg) rotateY(${cardRotate.y}deg)`,
                  transition: isMinting ? 'none' : 'transform 0.15s ease-out, box-shadow 0.2s ease-out'
                }}
              >
                <div className="nft-glow-layer"></div>
                <div className="nft-card-bg-pattern"></div>
                <div className="nft-header">
                  <div className="nft-chip"></div>
                  <div className="nft-network">BASE L2</div>
                </div>
                
                <div className="nft-content">
                  <div className="nft-logo-wrap">
                    <div className="nft-logo-pulse"></div>
                    <svg viewBox="0 0 100 100" className="nft-logo-svg">
                      {/* Concentric spinning rings */}
                      <circle cx="50" cy="50" r="44" stroke="rgba(0, 240, 255, 0.25)" strokeWidth="1" fill="none" strokeDasharray="6, 4" />
                      <circle cx="50" cy="50" r="38" stroke="rgba(255, 0, 127, 0.3)" strokeWidth="1.5" fill="none" strokeDasharray="16, 8" />
                      
                      {/* Intertwined glowing hexagons */}
                      <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="var(--color-blue)" strokeWidth="2" fill="none" strokeLinejoin="round" />
                      <polygon points="50,23 72,36 72,64 50,77 28,64 28,36" stroke="var(--color-pink)" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                      
                      {/* Core container ring for Logo */}
                      <circle cx="50" cy="50" r="16" fill="rgba(8, 10, 19, 0.9)" stroke="var(--color-blue)" strokeWidth="1.2" />
                    </svg>
                    
                    {/* Brand logo centered inside the NFT artwork */}
                    <img 
                      src="/logo.png?v=9" 
                      alt="SiteNest Logo" 
                      className="nft-core-logo"
                    />
                  </div>
                  <h3>{t.web3.cardTitle}</h3>
                </div>
                
                <div className="nft-footer">
                  <div className="nft-meta">
                    <span className="nft-label">{t.web3.cardOwner}</span>
                    <span className="nft-value">
                      {isWalletConnected ? walletAddress : '0x000...0000'}
                    </span>
                  </div>
                  <div className={`nft-status-badge ${isMinted ? 'active' : ''}`}>
                    {isMinted ? t.web3.statusActive : t.web3.statusInactive}
                  </div>
                </div>
              </div>

              {/* Art mode view toggler */}
              <button 
                onClick={() => setArtMode(!artMode)} 
                className="art-mode-toggle-btn animate-scale-up"
                style={{ marginTop: '1.25rem' }}
              >
                {artMode ? <Eye className="btn-icon" style={{ width: 16, height: 16 }} /> : <EyeOff className="btn-icon" style={{ width: 16, height: 16 }} />}
                <span>{artMode ? (lang === 'en' ? 'Show Details' : 'Показати деталі') : (lang === 'en' ? 'Art Mode (Hide UI)' : 'Художній режим (Сховати текст)')}</span>
              </button>

              {/* VIP status indicator under card */}
              {isMinted && (
                <div className="vip-discount-banner animate-slide-up" style={{ marginTop: '1rem' }}>
                  <Award className="vip-badge-icon" />
                  <span>{t.web3.vipActive}</span>
                </div>
              )}
            </div>

            {/* RIGHT: Web3 Wallet Connect & Mint widget */}
            <div className="glass-card web3-mint-widget">
              <div className="widget-header">
                <div className="widget-title-wrap">
                  <Coins className="widget-icon" />
                  <h2>NFT Mint Station</h2>
                </div>
                <p>
                  {NFT_CONTRACT_ADDRESS 
                    ? (lang === 'en' 
                        ? 'Connect your wallet to claim your agency member pass. VIP price will be activated immediately.' 
                        : 'Підключіть свій гаманець, щоб отримати членську карту агентства. VIP-ціна активується миттєво.'
                      )
                    : (lang === 'en' 
                        ? 'Connect your wallet to claim your agency member pass. This is a secure simulation.' 
                        : 'Підключіть свій гаманець, щоб отримати членську карту агентства. Це безпечна симуляція.'
                      )
                  }
                </p>
              </div>

              {/* NFT Details Board */}
              <div className="mint-details-panel">
                <div className="detail-row">
                  <span className="detail-label">{lang === 'en' ? 'Price' : 'Ціна'}</span>
                  <span className="detail-value text-green">
                    {NFT_CONTRACT_ADDRESS ? '0.008 ETH' : (lang === 'en' ? 'Free (Simulation)' : 'Безкоштовно (Симуляція)')}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{lang === 'en' ? 'Limit' : 'Ліміт'}</span>
                  <span className="detail-value">{NFT_CONTRACT_ADDRESS ? 'Limited' : '1 per wallet'}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{lang === 'en' ? 'Network' : 'Мережа'}</span>
                  <span className="detail-value text-blue">Base L2</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{lang === 'en' ? 'Supply' : 'Доступно'}</span>
                  <span className="detail-value">
                    {NFT_CONTRACT_ADDRESS ? '200 / 200' : '172 / 500'}
                  </span>
                </div>
                
                <div className="mint-perks-list">
                  <div className="perk-list-title">{t.web3.perksLabel}:</div>
                  <ul>
                    <li>✨ {lang === 'en' ? '15% Lifetime Discount on services' : 'Довічна знижка 15% на всі послуги'}</li>
                    <li>⚡ {lang === 'en' ? 'Priority 48h development start' : 'Пріоритетний старт розробки (48 год)'}</li>
                    <li>🌐 {lang === 'en' ? '1 Year Free Hosting & SSL setup' : '1 рік безкоштовного хостингу та SSL'}</li>
                    <li>🗳️ {lang === 'en' ? 'DAO voting & roadmap suggestions' : 'Голоси в DAO та пріоритетний беклог'}</li>
                  </ul>
                </div>
              </div>

              <div className="wallet-actions">
                <ConnectButton.Custom>
                  {({
                    account,
                    chain,
                    openAccountModal,
                    openChainModal,
                    openConnectModal,
                    authenticationStatus,
                    mounted,
                  }) => {
                    const ready = mounted && authenticationStatus !== 'loading';
                    const connected = ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated');

                    return (
                      <div
                        {...(!ready && {
                          'aria-hidden': true,
                          'style': {
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none',
                          },
                        })}
                        style={{ width: '100%' }}
                      >
                        {(() => {
                          if (!connected) {
                            return (
                              <button onClick={openConnectModal} type="button" className="btn btn-primary" style={{ width: '100%' }}>
                                <Wallet className="btn-icon" />
                                {t.web3.connectWallet}
                              </button>
                            );
                          }

                          if (chain.unsupported) {
                            return (
                              <button onClick={openChainModal} type="button" className="btn btn-primary" style={{ width: '100%', background: '#ff007f', borderColor: '#ff007f' }}>
                                {lang === 'en' ? 'Wrong Network (Switch to Base)' : 'Неправильна мережа (Перемкніть на Base)'}
                              </button>
                            );
                          }

                          return (
                            <button onClick={openAccountModal} type="button" className="btn btn-outline" style={{ width: '100%' }}>
                              <Lock className="btn-icon" />
                              {account.displayName} {account.displayBalance ? `(${account.displayBalance})` : ''}
                            </button>
                          );
                        })()}
                      </div>
                    );
                  }}
                </ConnectButton.Custom>

                {isWalletConnected && (
                  <MagneticButton style={{ width: '100%', marginTop: '1rem' }} strength={0.12}>
                    <button
                      onClick={mintNFT}
                      className={`btn btn-primary ${isMinted ? 'btn-disabled' : ''}`}
                      style={{ width: '100%' }}
                      disabled={isMinting || isMinted}
                    >
                      {isMinting ? (
                        <>
                          <RefreshCw className="btn-icon animate-spin" />
                          <span>{mintStatusText}</span>
                        </>
                      ) : isMinted ? (
                        <>
                          <CheckCircle2 className="btn-icon" />
                          <span>{t.web3.alreadyMinted}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="btn-icon" />
                          <span>{t.web3.mintNft}</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>
                )}
              </div>

              {NFT_CONTRACT_ADDRESS ? (
                <div className="simulation-disclaimer live-badge" style={{ borderColor: 'rgba(0, 240, 255, 0.2)', background: 'rgba(0, 240, 255, 0.03)' }}>
                  <ShieldCheck className="disclaimer-icon" style={{ color: 'var(--color-blue)' }} />
                  <span style={{ color: 'var(--color-blue)' }}>
                    {lang === 'en' 
                      ? 'Live on Base Mainnet. Official audited smart contract.' 
                      : 'Працює в мережі Base Mainnet. Офіційний смарт-контракт.'
                    }
                  </span>
                </div>
              ) : (
                <div className="simulation-disclaimer">
                  <ShieldCheck className="disclaimer-icon" />
                  <span>
                    {lang === 'en' 
                      ? 'Simulated environment. No real funds or transaction fees are required.' 
                      : 'Демонстраційне середовище. Реальні кошти або комісії за транзакції не потрібні.'
                    }
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* REAL-TIME COST CALCULATOR DEMONSTRATION */}
      <section className="section-padding" style={{ background: 'rgba(255,255,255,0.01)', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <span className="section-subtitle">
            {lang === 'en' ? 'Interactive Utility Demo' : 'Інтерактивна демонстрація корисності'}
          </span>
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            {lang === 'en' ? 'Discount' : 'Знижка'} <span>{lang === 'en' ? 'In Action' : 'в дії'}</span>
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-slate)', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            {lang === 'en'
              ? 'Test how the Member NFT dynamically affects pricing on our website. Connect and mint the NFT above to activate the VIP price!'
              : 'Перевірте, як наявність Member NFT динамічно впливає на ціноутворення нашого сайту. Підключіть та змінтіть NFT вище, щоб активувати VIP-ціну!'
            }
          </p>

          <div className="calculator-demo-grid">
            {/* Cost Options */}
            <div className="glass-card calc-demo-options">
              <h3 className="calc-title">{lang === 'en' ? 'Project Details' : 'Деталі проекту'}</h3>
              
              {/* Type Selection */}
              <div className="calc-group">
                <label>{lang === 'en' ? 'Website Type' : 'Тип сайту'}</label>
                <div className="calc-tabs">
                  <button 
                    className={selectedType === 'landing' ? 'active' : ''} 
                    onClick={() => setSelectedType('landing')}
                  >
                    Landing Page
                  </button>
                  <button 
                    className={selectedType === 'corporate' ? 'active' : ''} 
                    onClick={() => setSelectedType('corporate')}
                  >
                    Corporate
                  </button>
                  <button 
                    className={selectedType === 'ecommerce' ? 'active' : ''} 
                    onClick={() => setSelectedType('ecommerce')}
                  >
                    E-commerce
                  </button>
                </div>
              </div>

              {/* Addons Selection */}
              <div className="calc-group" style={{ marginTop: '1.5rem' }}>
                <label>{lang === 'en' ? 'Add-on Services' : 'Додаткові послуги'}</label>
                <div className="calc-checkboxes">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={devopsAddon} 
                      onChange={(e) => setDevopsAddon(e.target.checked)} 
                    />
                    <span className="checkbox-text">DevOps & CDN Setup (+ $50)</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={seoAddon} 
                      onChange={(e) => setSeoAddon(e.target.checked)} 
                    />
                    <span className="checkbox-text">SEO Starter Kit (+ $100)</span>
                  </label>
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={apiAddon} 
                      onChange={(e) => setApiAddon(e.target.checked)} 
                    />
                    <span className="checkbox-text">API & CRM Integration (+ $100)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Price Output */}
            <div className="glass-card calc-demo-price">
              <h3 className="calc-title">{lang === 'en' ? 'Cost Summary' : 'Підсумок вартості'}</h3>
              
              <div className="price-rows">
                <div className="price-row">
                  <span>{lang === 'en' ? 'Standard Price' : 'Стандартна ціна'}:</span>
                  <span className={`price-val ${isMinted ? 'crossed-out' : ''}`}>${totalOriginal}</span>
                </div>
                
                {isMinted && (
                  <div className="price-row vip-row animate-scale-up">
                    <span>VIP Member Price (15% Off):</span>
                    <span className="price-val vip">${totalWithDiscount}</span>
                  </div>
                )}
              </div>

              <div className="price-status-message">
                {isMinted ? (
                  <div className="msg-box success">
                    <CheckCircle2 className="msg-icon" />
                    <span>{lang === 'en' ? '15% discount applied automatically!' : 'Знижку 15% застосовано автоматично!'}</span>
                  </div>
                ) : (
                  <div className="msg-box warning">
                    <Lock className="msg-icon" />
                    <span>
                      {lang === 'en' 
                        ? 'Mint the Member NFT above to unlock VIP pricing.' 
                        : 'Змінтіть Member NFT вище, щоб відкрити VIP-ціну.'
                      }
                    </span>
                  </div>
                )}
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>
                <span>{lang === 'en' ? 'Order Project' : 'Замовити розрахунок'}</span>
                <ArrowRight className="btn-icon" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS GRID */}
      <section className="section-padding">
        <div className="container">
          <span className="section-subtitle">{t.web3.benefitsTitle}</span>
          <h2 className="section-title">
            {lang === 'en' ? 'Exclusive' : 'Ексклюзивні'} <span>{lang === 'en' ? 'Perks' : 'Привілеї'}</span>
          </h2>
          
          <div className="web3-perks-grid">
            <div className="glass-card perk-card">
              <Award className="perk-icon" style={{ color: 'var(--color-orange)' }} />
              <h3>{t.web3.benefit1Title}</h3>
              <p>{t.web3.benefit1Desc}</p>
            </div>
            
            <div className="glass-card perk-card">
              <RefreshCw className="perk-icon" style={{ color: 'var(--color-pink)' }} />
              <h3>{t.web3.benefit2Title}</h3>
              <p>{t.web3.benefit2Desc}</p>
            </div>
            
            <div className="glass-card perk-card">
              <ShieldCheck className="perk-icon" style={{ color: 'var(--color-blue)' }} />
              <h3>{t.web3.benefit3Title}</h3>
              <p>{t.web3.benefit3Desc}</p>
            </div>
            
            <div className="glass-card perk-card">
              <Sparkles className="perk-icon" style={{ color: 'var(--color-purple)' }} />
              <h3>{t.web3.benefit4Title}</h3>
              <p>{t.web3.benefit4Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOR CLIENTS - WEB3 B2B PROMOTION */}
      <section className="section-padding cta-banner">
        <div className="container">
          <h2>
            {t.web3.forClientsTitle}
          </h2>
          <p>
            {t.web3.forClientsDesc}
          </p>
          <Link href="/contact" className="btn btn-primary">
            <span>{t.web3.orderWeb3}</span>
            <ArrowRight className="btn-icon" />
          </Link>
        </div>
      </section>
    </div>
  );
}
