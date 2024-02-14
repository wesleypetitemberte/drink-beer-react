import type { StructureResolver } from 'sanity/structure';
import { HomeIcon, CubeIcon, CogIcon } from '@sanity/icons';

export const structure: StructureResolver = (S) =>
S.list()
.id('root')
.title('Content')
.items([
    S.listItem()
    .title('Home')
    .id('homeType')
    .icon(HomeIcon)
    .child(S.document().schemaType('home').documentId('homeType')),
    S.divider(),
    S.documentTypeListItem('beerPage').title('Produtos').icon(CubeIcon),
    S.divider(),
    S.listItem()
    .title('Settings')
    .id('settingsType')
    .icon(CogIcon)
    .child(S.document().schemaType('settings').documentId('settingsType'))
]);