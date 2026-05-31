# SEO Launch Checklist — pvs-promoters.com

Complete these steps after deploying the updated site.

## DNS & redirects (hosting panel)

- [ ] Configure **301 redirect** from `pvspromoters.com` → `pvs-promoters.com` (preserve path + query)
- [ ] Configure **301 redirect** from `www.pvspromoters.com` → `pvs-promoters.com`
- [ ] Verify `NEXT_PUBLIC_SITE_URL=https://pvs-promoters.com` in production Docker/hosting env

## Google Search Console

- [ ] Verify ownership of `https://pvs-promoters.com` (file: `/googleae2144dfb67cada5.html` already in repo)
- [ ] Submit sitemap: `https://pvs-promoters.com/sitemap.xml`
- [ ] Use **Change of Address** tool: old domain `pvspromoters.com` → new domain `pvs-promoters.com`
- [ ] Monitor **Coverage** and **Page indexing** for 4 weeks after migration
- [ ] Check **404 errors** and add redirects for any missed legacy URLs

## Rich results validation

Test these URLs in [Google Rich Results Test](https://search.google.com/test/rich-results):

- [ ] `https://pvs-promoters.com/` — Organization
- [ ] `https://pvs-promoters.com/faq` — FAQPage
- [ ] `https://pvs-promoters.com/testimonials` — Review / AggregateRating
- [ ] `https://pvs-promoters.com/projects/phase-1` — RealEstateListing + BreadcrumbList
- [ ] `https://pvs-promoters.com/projects/phase-2`
- [ ] `https://pvs-promoters.com/projects/shoolagiri`
- [ ] `https://pvs-promoters.com/guides/hosur-farmland-investment` — Article

## Open Graph & social

- [ ] Validate OG tags at [opengraph.xyz](https://www.opengraph.xyz/) for home, projects, guides
- [ ] Confirm `/opengraph-image` renders 1200×630 branded image

## Performance

- [ ] Run Lighthouse mobile on homepage (target SEO score 90+)
- [ ] Run Lighthouse on `/projects/phase-1` (target SEO score 90+)

## Post-launch monitoring (30 days)

- [ ] Track rankings for: farmland near hosur, managed farmland near bangalore, coco farmland hosur
- [ ] Publish 1 new guide per month under `/guides`
- [ ] Rotate Atlas MongoDB password if credentials were exposed
