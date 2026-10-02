"""Check generated pages, links, localized assets and SEO metadata."""
from html.parser import HTMLParser
from urllib.parse import urlsplit
from pathlib import Path
import html
from build_site import ROOT, BASE, LOCALES, PRODUCTS, url
class Page(HTMLParser):
    def __init__(self,text):
        super().__init__();self.tags=[];self.feed(text)
    def handle_starttag(self,tag,attrs): self.tags.append((tag,dict(attrs)))
for lang,t in LOCALES.items():
    assert len(t)==36 and all(isinstance(t[33+i],list) and len(t[33+i])==3 for i in range(3)),lang
    for product in [None]+PRODUCTS:
        route=url(lang,product[0] if product else None)
        file=ROOT/route.lstrip('/')/'index.html'; text=file.read_text(); page=Page(text)
        assert sum(tag=='h1' for tag,a in page.tags)==1,file
        links=[a for tag,a in page.tags if tag=='link']
        assert any(a.get('rel')=='canonical' and a['href']==BASE+route for a in links),file
        assert len([a for a in links if a.get('rel')=='alternate'])==8,file
        assert any(tag=='meta' and a.get('name')=='description' and a.get('content') for tag,a in page.tags),file
        for tag,a in page.tags:
            ref=a.get('src') or (a.get('href') if tag in ('a','link') else None)
            if ref and ref.startswith('/'):
                target=urlsplit(ref);dest=ROOT/target.path.lstrip('/')
                if target.path.endswith('/'): dest=dest/'index.html'
                assert dest.exists(),(file,ref)
                if target.fragment:
                    other=Page(dest.read_text());assert any(at.get('id')==target.fragment for _,at in other.tags),(file,ref)
            if tag=='img': assert a.get('alt'),file
        for p in ([product] if product else PRODUCTS):
            assert f'https://apps.apple.com/app/id{p[3]}' in text,file
            assert f'https://play.google.com/store/apps/details?id={p[4]}' in text,file
            i=PRODUCTS.index(p)
            assert html.escape(t[27+i], quote=True) in text and all(f'<li>{html.escape(x, quote=True)}</li>' in text for x in t[33+i]),file
print('PASS: 28 pages; all internal links, localized images, store URLs, headings and SEO metadata.')
