import { reactive } from 'vue';

import type { FormRules } from 'element-plus';
import { MdataMetaSchema } from '@/api/mdata';
import i18n from '@/i18n/i18n';

const { t } = i18n.global;

export const rules = reactive<FormRules<MdataMetaSchema>>({
    name: [
        {
            required: true,
            message: t('bm.meta-data.validation.name.no-empty'),
            trigger: 'change'
        }
    ],
    origin_url: [
        {
            required: true,
            message: t('bm.meta-data.validation.origin_url.no-empty'),
            trigger: 'blur'
        },
        {
            asyncValidator: async(rule: any, value: string, callback: (error?: string | Error) => void) => {
                // TODO: 验证 url 是否存在
            },
            trigger: 'blur'
        }
    ],
    description: [
        {
            required: true,
            message: t('bm.meta-data.validation.description.no-empty'),
            trigger: 'change'
        }
    ]
});