import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    post_coments: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::post-coment.post-coment'
    >;
    etiquetas: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::etiqueta.etiqueta'
    >;
    posts: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::post.post'
    >;
    empresas: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::empresa.empresa'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaEventoCategoriaEvento
  extends Schema.CollectionType {
  collectionName: 'categoria_eventos';
  info: {
    singularName: 'categoria-evento';
    pluralName: 'categoria-eventos';
    displayName: 'CategoriaEventos';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    eventos: Attribute.Relation<
      'api::categoria-evento.categoria-evento',
      'oneToMany',
      'api::evento.evento'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-evento.categoria-evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-evento.categoria-evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaOfertaCategoriaOferta
  extends Schema.CollectionType {
  collectionName: 'categoria_ofertas';
  info: {
    singularName: 'categoria-oferta';
    pluralName: 'categoria-ofertas';
    displayName: 'CategoriaOfertas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    ofertas: Attribute.Relation<
      'api::categoria-oferta.categoria-oferta',
      'oneToMany',
      'api::oferta.oferta'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-oferta.categoria-oferta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-oferta.categoria-oferta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoriaTurismoCategoriaTurismo
  extends Schema.CollectionType {
  collectionName: 'categoria_turismos';
  info: {
    singularName: 'categoria-turismo';
    pluralName: 'categoria-turismos';
    displayName: 'CategoriaTurismo';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Id_cat_turismo: Attribute.UID & Attribute.Required;
    nombre: Attribute.String;
    categoria_padre: Attribute.String;
    empresas: Attribute.Relation<
      'api::categoria-turismo.categoria-turismo',
      'oneToMany',
      'api::empresa.empresa'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::categoria-turismo.categoria-turismo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::categoria-turismo.categoria-turismo',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'category';
  };
  options: {
    draftAndPublish: true;
  };
  pluginOptions: {
    i18n: {
      localized: true;
    };
  };
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    uid: Attribute.UID<'api::category.category', 'title'> & Attribute.Required;
    posts: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    localizations: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::category.category'
    >;
    locale: Attribute.String;
  };
}

export interface ApiEmpresaEmpresa extends Schema.CollectionType {
  collectionName: 'empresas';
  info: {
    singularName: 'empresa';
    pluralName: 'empresas';
    displayName: 'Empresas';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Uid_empresas: Attribute.UID & Attribute.Required;
    nombre_comercial: Attribute.String;
    nombre_legal: Attribute.String;
    slogan: Attribute.String;
    direccion: Attribute.String;
    direccion_maps: Attribute.String;
    direccion_waze: Attribute.String;
    tipos_servicios: Attribute.Text;
    servicios_extras: Attribute.Text;
    categoria_turismo: Attribute.Relation<
      'api::empresa.empresa',
      'manyToOne',
      'api::categoria-turismo.categoria-turismo'
    >;
    menu: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    fotos_lugar: Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    lugares_cercanos: Attribute.Text;
    historia: Attribute.Text;
    user: Attribute.Relation<
      'api::empresa.empresa',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    ofertas: Attribute.Relation<
      'api::empresa.empresa',
      'oneToMany',
      'api::oferta.oferta'
    >;
    eventos: Attribute.Relation<
      'api::empresa.empresa',
      'oneToMany',
      'api::evento.evento'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::empresa.empresa',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::empresa.empresa',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEtiquetaEtiqueta extends Schema.CollectionType {
  collectionName: 'etiquetas';
  info: {
    singularName: 'etiqueta';
    pluralName: 'etiquetas';
    displayName: 'Etiquetas';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre_etiqueta: Attribute.String;
    user: Attribute.Relation<
      'api::etiqueta.etiqueta',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    posts: Attribute.Relation<
      'api::etiqueta.etiqueta',
      'manyToMany',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::etiqueta.etiqueta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::etiqueta.etiqueta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventoEvento extends Schema.CollectionType {
  collectionName: 'eventos';
  info: {
    singularName: 'evento';
    pluralName: 'eventos';
    displayName: 'Eventos';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre_evento: Attribute.String;
    descripcion: Attribute.Blocks;
    fecha_inicio: Attribute.Date;
    fecha_final: Attribute.Date;
    imagenes: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    autorizado: Attribute.Boolean;
    pagado: Attribute.Boolean;
    categoria_evento: Attribute.Relation<
      'api::evento.evento',
      'manyToOne',
      'api::categoria-evento.categoria-evento'
    >;
    empresa: Attribute.Relation<
      'api::evento.evento',
      'manyToOne',
      'api::empresa.empresa'
    >;
    url_evento: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::evento.evento',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOfertaOferta extends Schema.CollectionType {
  collectionName: 'ofertas';
  info: {
    singularName: 'oferta';
    pluralName: 'ofertas';
    displayName: 'Ofertas';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre_oferta: Attribute.String;
    descripcion: Attribute.Blocks;
    descuento: Attribute.Integer;
    fecha_inicio: Attribute.Date;
    fecha_final: Attribute.Date;
    imagenes: Attribute.Media<'images', true>;
    autorizado: Attribute.Boolean & Attribute.DefaultTo<false>;
    pagada: Attribute.Boolean & Attribute.DefaultTo<false>;
    categoria_oferta: Attribute.Relation<
      'api::oferta.oferta',
      'manyToOne',
      'api::categoria-oferta.categoria-oferta'
    >;
    empresa: Attribute.Relation<
      'api::oferta.oferta',
      'manyToOne',
      'api::empresa.empresa'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::oferta.oferta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::oferta.oferta',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.Blocks & Attribute.Required;
    multimedia: Attribute.Media<'images' | 'videos', true>;
    slug: Attribute.String & Attribute.Unique;
    categories: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'api::category.category'
    >;
    user_published: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    post_coments: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post-coment.post-coment'
    >;
    waze_url: Attribute.String;
    pie_foto: Attribute.String;
    descripcion_post: Attribute.Text;
    etiquetas: Attribute.Relation<
      'api::post.post',
      'manyToMany',
      'api::etiqueta.etiqueta'
    >;
    imagen_miniatura: Attribute.Media<'images'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPostComentPostComent extends Schema.CollectionType {
  collectionName: 'post_coments';
  info: {
    singularName: 'post-coment';
    pluralName: 'post-coments';
    displayName: 'Post_Coments';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comentario: Attribute.String;
    user: Attribute.Relation<
      'api::post-coment.post-coment',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    post: Attribute.Relation<
      'api::post-coment.post-coment',
      'manyToOne',
      'api::post.post'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::post-coment.post-coment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::post-coment.post-coment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTAnuncioTAnuncio extends Schema.CollectionType {
  collectionName: 't_anuncios';
  info: {
    singularName: 't-anuncio';
    pluralName: 't-anuncios';
    displayName: 't_anuncios';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    titulo: Attribute.String;
    imagen: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    url_destino: Attribute.Text;
    tipo: Attribute.Integer;
    posicion: Attribute.String;
    activo: Attribute.Boolean;
    fecha_inicio: Attribute.DateTime;
    fecha_fin: Attribute.DateTime;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-anuncio.t-anuncio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-anuncio.t-anuncio',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTConfiguracionesLandingTConfiguracionesLanding
  extends Schema.CollectionType {
  collectionName: 't_configuraciones_landings';
  info: {
    singularName: 't-configuraciones-landing';
    pluralName: 't-configuraciones-landings';
    displayName: 't_configuraciones_landing';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    clave: Attribute.String;
    valor: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-configuraciones-landing.t-configuraciones-landing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-configuraciones-landing.t-configuraciones-landing',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTCountryComentTCountryComent extends Schema.CollectionType {
  collectionName: 't_country_coments';
  info: {
    singularName: 't-country-coment';
    pluralName: 't-country-coments';
    displayName: 't_country_coments';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    comentario: Attribute.Text;
    t_paise: Attribute.Relation<
      'api::t-country-coment.t-country-coment',
      'manyToOne',
      'api::t-pais.t-pais'
    >;
    admin_user: Attribute.Relation<
      'api::t-country-coment.t-country-coment',
      'oneToOne',
      'admin::user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-country-coment.t-country-coment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-country-coment.t-country-coment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTMenuTMenu extends Schema.CollectionType {
  collectionName: 't_menus';
  info: {
    singularName: 't-menu';
    pluralName: 't-menus';
    displayName: 't_menus';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    es_internacional: Attribute.Boolean;
    t_menu_pai: Attribute.Relation<
      'api::t-menu.t-menu',
      'oneToOne',
      'api::t-menu-pais.t-menu-pais'
    >;
    t_menu_items: Attribute.Relation<
      'api::t-menu.t-menu',
      'manyToMany',
      'api::t-menu-item.t-menu-item'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-menu.t-menu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-menu.t-menu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTMenuItemTMenuItem extends Schema.CollectionType {
  collectionName: 't_menu_items';
  info: {
    singularName: 't-menu-item';
    pluralName: 't-menu-items';
    displayName: 't_menu_items';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    t_menus: Attribute.Relation<
      'api::t-menu-item.t-menu-item',
      'manyToMany',
      'api::t-menu.t-menu'
    >;
    titulo: Attribute.String;
    url: Attribute.String;
    orden: Attribute.Integer;
    item_padre: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-menu-item.t-menu-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-menu-item.t-menu-item',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTMenuPaisTMenuPais extends Schema.CollectionType {
  collectionName: 't_menu_paises';
  info: {
    singularName: 't-menu-pais';
    pluralName: 't-menu-paises';
    displayName: 't_menu_pais';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    menu_id: Attribute.Integer;
    pais_id: Attribute.Integer;
    t_menu: Attribute.Relation<
      'api::t-menu-pais.t-menu-pais',
      'oneToOne',
      'api::t-menu.t-menu'
    >;
    t_paise: Attribute.Relation<
      'api::t-menu-pais.t-menu-pais',
      'oneToOne',
      'api::t-pais.t-pais'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-menu-pais.t-menu-pais',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-menu-pais.t-menu-pais',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTPaisTPais extends Schema.CollectionType {
  collectionName: 't_paises';
  info: {
    singularName: 't-pais';
    pluralName: 't-paises';
    displayName: 'T_paises';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nombre: Attribute.String;
    slug: Attribute.String;
    titular: Attribute.String;
    historia: Attribute.Blocks;
    url_waze: Attribute.String;
    url_maps: Attribute.String;
    t_country_coments: Attribute.Relation<
      'api::t-pais.t-pais',
      'oneToMany',
      'api::t-country-coment.t-country-coment'
    >;
    img_miniatura: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    t_menu_pai: Attribute.Relation<
      'api::t-pais.t-pais',
      'oneToOne',
      'api::t-menu-pais.t-menu-pais'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::t-pais.t-pais',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::t-pais.t-pais',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::categoria-evento.categoria-evento': ApiCategoriaEventoCategoriaEvento;
      'api::categoria-oferta.categoria-oferta': ApiCategoriaOfertaCategoriaOferta;
      'api::categoria-turismo.categoria-turismo': ApiCategoriaTurismoCategoriaTurismo;
      'api::category.category': ApiCategoryCategory;
      'api::empresa.empresa': ApiEmpresaEmpresa;
      'api::etiqueta.etiqueta': ApiEtiquetaEtiqueta;
      'api::evento.evento': ApiEventoEvento;
      'api::oferta.oferta': ApiOfertaOferta;
      'api::post.post': ApiPostPost;
      'api::post-coment.post-coment': ApiPostComentPostComent;
      'api::t-anuncio.t-anuncio': ApiTAnuncioTAnuncio;
      'api::t-configuraciones-landing.t-configuraciones-landing': ApiTConfiguracionesLandingTConfiguracionesLanding;
      'api::t-country-coment.t-country-coment': ApiTCountryComentTCountryComent;
      'api::t-menu.t-menu': ApiTMenuTMenu;
      'api::t-menu-item.t-menu-item': ApiTMenuItemTMenuItem;
      'api::t-menu-pais.t-menu-pais': ApiTMenuPaisTMenuPais;
      'api::t-pais.t-pais': ApiTPaisTPais;
    }
  }
}
