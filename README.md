# Another Door

Static, multilingual company website for GitHub Pages at https://www.anotherdoor.io.

## Preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. English is the root language; German, Spanish, Japanese, Simplified Chinese, French and Korean use locale directories. Each language includes the homepage and three product pages.

## Edit and regenerate

Content and page templates live in `tools/build_site.py`; presentation lives in `styles.css`. Product screenshots and icons live in `images/`. After changes:

```sh
python3 tools/build_site.py
python3 tools/check_site.py
node --check script.js
```

Commit the generated HTML pages along with their assets. GitHub Pages can serve this repository directly without installing dependencies or running a build. Preserve `CNAME`, `.nojekyll` and `app-ads.txt`.

SEO includes canonical URLs, alternate language links, Organization/SoftwareApplication JSON-LD, Open Graph metadata, robots.txt and sitemap.xml. After deployment, submit https://www.anotherdoor.io/sitemap.xml in Google Search Console. No analytics or tracking has been added.

Waky and Risby privacy links come from their App Store listings. JangoLog copy is limited to features visible in supplied screenshots; its full store description and privacy URL should be verified before expanding those claims.
