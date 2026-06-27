import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: process.env.NODE_ENV === 'production'
    ? {
        kind: 'github',
        repo: 'redrembo24680/sitenest_agency',
      }
    : {
        kind: 'local',
      },
  collections: {
    blog: collection({
      label: 'Блог (Статті)',
      slugField: 'title',
      path: 'content/blog/*',
      entryLayout: 'content',
      format: { contentField: 'content' },
      previewUrl: '/blog/{slug}',
      schema: {
        title: fields.slug({ name: { label: 'Заголовок' } }),
        description: fields.text({ label: 'Короткий опис (для SEO та прев\'ю)', multiline: true, validation: { length: { min: 1 } } }),
        date: fields.date({ label: 'Дата публікації', defaultValue: { kind: 'today' } }),
        coverImage: fields.image({
          label: 'Обкладинка статті',
          directory: 'public/images/blog',
          publicPath: '/images/blog/',
        }),
        category: fields.select({
          label: 'Категорія статті',
          options: [
            { label: 'DevOps', value: 'devops' },
            { label: 'Backend', value: 'backend' },
            { label: 'Marketing', value: 'marketing' },
            { label: 'General', value: 'general' },
          ],
          defaultValue: 'general',
        }),
        author: fields.text({ label: 'Автор статті', defaultValue: 'SiteNest Expert' }),
        readTime: fields.text({ label: 'Час читання (наприклад, 5 хв)', defaultValue: '5 хв' }),
        language: fields.select({
          label: 'Мова статті',
          options: [
            { label: 'Українська', value: 'uk' },
            { label: 'English', value: 'en' },
          ],
          defaultValue: 'uk',
        }),
        content: fields.document({
          label: 'Вміст статті',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/blog',
            publicPath: '/images/blog/',
          },
        }),
      },
    }),
  },
});
