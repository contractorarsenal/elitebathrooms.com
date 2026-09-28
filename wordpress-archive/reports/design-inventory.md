# Design Inventory

Aggregated from 62 LiteSpeed-combined CSS bundles (one per unique page template, downloaded from the live site) plus the Google Fonts stylesheet. This is a static-CSS analysis, not a live computed-style capture — see caveat at the end.

## Brand / frequently-used colors (top 30 by occurrence across all bundles)

| Color | Occurrences | Likely role |
|---|---|---|
| `#fff` | 25225 | White |
| `#fff0` | 10278 |  |
| `#000` | 2269 | Black |
| `#9f9fa4a3` | 1159 |  |
| `#21759b` | 976 |  |
| `#1f2124` | 803 |  |
| `#f1f1f1` | 732 |  |
| `#1da1f2` | 732 |  |
| `#ffffff` | 721 | White |
| `#ccc` | 721 |  |
| `#e3e3e8` | 715 | Border — matches Elementor kit `border` token |
| `#333` | 707 |  |
| `#69727d` | 673 |  |
| `#3f444b` | 613 |  |
| `#f6f6f6` | 608 |  |
| `#b98a64` | 526 | Primary / brand accent (bronze) — matches Elementor kit `primary` token |
| `#f9f9f9` | 488 |  |
| `#0077b5` | 488 |  |
| `#eee` | 455 |  |
| `#000000` | 435 | Black |
| `#d9534f` | 366 |  |
| `#3b5998` | 366 |  |
| `#1ab7ea` | 366 |  |
| `#999` | 361 |  |
| `#25272e` | 339 | Secondary / heading dark — matches Elementor kit `secondary` token |
| `#33373d` | 310 |  |
| `#0967a0` | 305 |  |
| `#f4f4f4` | 278 |  |
| `#0000` | 245 |  |
| `#55595c` | 244 |  |

## Font families actually declared in CSS (not just the Elementor kit's abstract tokens)

The Elementor global kit declares Primary=Roboto and Secondary(Heading)=Figtree, but the rendered CSS shows these theme/antra-specific overrides in real use:

| font-family value | Occurrences |
|---|---|
| `"antra-icon"` | 19154 |
| `'Roboto'` | 9882 |
| `"Font Awesome 5 Free"` | 8235 |
| `var(--e-global-typography-secondary-font-family)` | 7503 |
| `var(--e-global-typography-text-font-family)` | 3904 |
| `"Font Awesome 5 Brands"` | 3233 |
| `var(--e-global-typography-accent-font-family)` | 2989 |
| `'Figtree'` | 1708 |
| `'Golos Text'` | 1464 |
| `"Figtree",Serif` | 1127 |
| `var(--e-global-typography-primary-font-family)` | 976 |
| `var(--gf-icon-font-family)!important` | 546 |
| `Cal Sans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, serif, sans-serif` | 366 |
| `eicons` | 244 |
| `inherit` | 223 |
| `sans-serif` | 200 |
| `var(--gf-local-font-family)` | 195 |
| `"Golos Text",Serif` | 184 |
| `'Font Awesome 5 Free'` | 183 |
| `"Courier 10 Pitch",Courier,monospace` | 183 |
| `"Roboto"` | 183 |
| `var(--gf-ctrl-font-family)` | 156 |
| `"Cal Sans",Serif` | 131 |
| `swiper-icons` | 122 |
| `monospace,monospace` | 122 |

## Responsive breakpoints found (`@media` queries, by frequency)

| Media query | Occurrences |
|---|---|
| `@media (max-width:767px)` | 9914 |
| `@media (max-width:1024px)` | 5244 |
| `@media (max-width:568px)` | 3782 |
| `@media (max-width:768px)` | 2806 |
| `@media (min-width:1024px)` | 2443 |
| `@media (min-width:768px)` | 1168 |
| `@media (max-width:-1)` | 1142 |
| `@media (min-width:640px)` | 897 |
| `@media (max-width:1366px)` | 753 |
| `@media (max-width:1023px)` | 671 |
| `@media (min-width:-1)` | 648 |
| `@media (min-width:768px) and (max-width:1410px)` | 610 |
| `@media (max-width:1200px)` | 549 |
| `@media (max-width:567px)` | 427 |
| `@media(max-width:767px)` | 403 |
| `@media(max-width:1366px)` | 341 |
| `@media(max-width:1024px)` | 341 |
| `@media (max-width:480px)` | 302 |
| `@media(min-width:768px)` | 244 |
| `@media (min-width:1024px) and (max-width:1024px)` | 244 |
| `@media (max-width:425px)` | 244 |
| `@media(max-width:1366px) and (min-width:768px)` | 236 |
| `@media(max-width:1024px) and (min-width:768px)` | 184 |
| `@media (min-width:600px)` | 183 |
| `@media (min-width:768px) and (max-width:1024px)` | 183 |
| `@media (min-width:783px)` | 183 |
| `@media (min-width:601px) and (max-width:782px)` | 183 |
| `@media (prefers-reduced-motion:reduce)` | 182 |
| `@media (min-width:1025px)` | 123 |
| `@media (min-width:568px)` | 122 |

## Border radii in use

| Value | Occurrences |
|---|---|
| `100px` | 3843 |
| `24px` | 3233 |
| `50%` | 2478 |
| `0` | 1766 |
| `4px` | 963 |
| `10px` | 854 |
| `3px` | 748 |
| `2px` | 732 |
| `24px 24px 24px 24px` | 424 |
| `5px` | 404 |
| `40px` | 300 |
| `20px` | 262 |
| `0 24px 0 0` | 244 |
| `3px 0 0 3px` | 240 |
| `50px` | 185 |
| `var(--border-radius)` | 183 |
| `9px` | 183 |
| `100%` | 182 |
| `6px` | 126 |
| `.1em` | 122 |

## Box shadows in use

| Value | Occurrences |
|---|---|
| `0 0 2px 2px rgb(0 0 0 / .6)` | 1464 |
| `none` | 849 |
| `0 4px 30px 0 rgb(0 0 0 / .1)` | 244 |
| `0 4px 30px rgb(0 0 0 / .1)` | 122 |
| `inset 0 0 3px rgb(0 0 0 / .3)` | 122 |
| `0 3px 30px rgb(0 0 0 / .08)` | 122 |
| `none}.mobile-navigation .dropdown-toggle:focus,.mobile-navigation-categories .dropdown-toggle:focus{outline:none}.mobile-navigation .dropdown-toggle:before,.mobile-navigation-categories .dropdown-toggle:before{display:none}.mobile-navigation .dropdown-toggle:hover,.mobile-navigation .dropdown-toggle:active,.mobile-navigation .dropdown-toggle:focus,.mobile-navigation-categories .dropdown-toggle:hover,.mobile-navigation-categories .dropdown-toggle:active,.mobile-navigation-categories .dropdown-toggle:focus{border:none` | 122 |
| `inset 0 0 6px rgb(0 0 0 / .3)}@media (max-width:1024px){.antra-category-navigation .antra-list-categories::-webkit-scrollbar-thumb{background:var(--e-global-color-border)}}.antra-category-navigation .antra-list-categories:hover::-webkit-scrollbar-thumb{background:var(--e-global-color-border)}.antra-category-navigation .antra-item-category a{font-family:var(--e-global-typography-text-font-family)` | 122 |
| `.313rem .313rem 0 .313rem #F1F6F8` | 122 |
| `0 0 3px rgb(0 0 0 / .15)` | 122 |
| `inset 0 0 6px var(--e-global-color-primary)` | 122 |
| `var(--gf-local-shadow)` | 117 |
| `var(--n-menu-dropdown-content-box-shadow-horizontal) var(--n-menu-dropdown-content-box-shadow-vertical) var(--n-menu-dropdown-content-box-shadow-blur) var(--n-menu-dropdown-content-box-shadow-spread) var(--n-menu-dropdown-content-box-shadow-color) var(--n-menu-dropdown-content-box-shadow-position, )` | 106 |
| `0 4px 10px -2px rgb(0 0 0 / .1)` | 61 |
| `0 4px 10px -2px rgb(0 0 0 / .1)}.hfe-submenu-icon-arrow .hfe-nav-menu .parent-has-child .sub-arrow i:before{content:''}.hfe-submenu-icon-classic .hfe-nav-menu .parent-has-child .sub-arrow i:before{content:''}.hfe-submenu-icon-plus .hfe-nav-menu .parent-has-child .sub-arrow i:before{content:'+'}.hfe-submenu-icon-none .hfe-nav-menu .parent-has-child .sub-arrow{display:none}.hfe-submenu-icon-arrow .hfe-nav-menu .parent-has-child .sub-menu-active .sub-arrow i:before,.hfe-link-redirect-self_link.hfe-submenu-icon-arrow .hfe-nav-menu .parent-has-child .menu-active .sub-arrow i:before{content:''}.hfe-submenu-icon-plus .hfe-nav-menu .parent-has-child .sub-menu-active .sub-arrow i:before,.hfe-link-redirect-self_link.hfe-submenu-icon-plus .hfe-nav-menu .parent-has-child .menu-active .sub-arrow i:before{content:'-'}.hfe-submenu-icon-classic .hfe-nav-menu .parent-has-child .sub-menu-active .sub-arrow i:before,.hfe-link-redirect-self_link.hfe-submenu-icon-classic .hfe-nav-menu .parent-has-child .menu-active .sub-arrow i:before{content:''}.rtl .hfe-submenu-icon-arrow .hfe-nav-menu__layout-horizontal .menu-item-has-children ul a .sub-arrow i:before{content:''}.rtl .hfe-submenu-icon-classic .hfe-nav-menu__layout-horizontal .menu-item-has-children ul a .sub-arrow i:before{content:''}.hfe-submenu-icon-arrow .hfe-nav-menu__layout-horizontal .menu-item-has-children ul a .sub-arrow i:before{content:''}.hfe-submenu-icon-classic .hfe-nav-menu__layout-horizontal .menu-item-has-children ul a .sub-arrow i:before{content:''}.hfe-nav-menu-icon{padding:.35em` | 61 |

## Known values (from the live Elementor global kit, read via MCP earlier this session)

- Colors: primary `#B98A64`, secondary `#25272E`, text `#000000`, accent `#858C6D`, accent-light `#CBD3B2`, dark `#000000`, border `#E3E3E8`, background-field `#F1F0F5`
- Typography: Primary = Roboto 16px/400 · Secondary(Heading) = Figtree 800 4.4rem
- Container width: 1410px · widget spacing: 1rem

## Caveat

This report is built by regex-scanning 62 static, server-combined CSS bundles (LiteSpeed's combine/minify output, one per page template) for literal color/font/breakpoint values. It captures every value the site actually ships, but it is not a live computed-style audit (hover states, JS-driven animation classes, and which of these values apply to which specific component are not resolved here). Screenshots in `screenshots/` are the more reliable source for exact visual layout and spacing per component.

