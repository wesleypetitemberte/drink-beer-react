import type { StructureResolver } from 'sanity/structure';
import { DocumentsIcon, HomeIcon, CubeIcon, CogIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
S.list()
.id('root')
.title('Conteúdo')
.items([
    S.listItem()
    .title('Páginas')
    .id('pages')
    .icon(DocumentsIcon)
    .child(
        S.list()
        .title('Páginas')
        .items([
            S.documentTypeListItem('home').title('Home').icon(HomeIcon)
        ])
    ),
    S.divider(),
    S.documentTypeListItem('beerPage').title('Produtos').icon(CubeIcon),
    S.divider(),
    S.documentTypeListItem('settings').title('Settings').icon(CogIcon)
]);
