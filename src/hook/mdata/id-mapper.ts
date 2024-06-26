import i18n from '@/i18n/i18n';

const { t } = i18n.global;

export const taskIds = {
    "0": "others",
    "1": "classification",
    "2": "segmentation",
    "3": "detection",
    "4": "reconstruction",
    "5": "superresolution",
    "6": "registration",
};

export const modalityIds = {
    "0": "others",
    "1": "common",
    "2": "ct",
    "3": "mri",
    "4": "xray",
    "5": "pet",
    "6": "ultrasonic",
    "7": "wsi",
    "8": "ehr",
    "9": "biomarker"
};

export const taskIdLabel = [
    t('task.others'),
    t('task.classification'),
    t('task.segmentation'),
    t('task.detection'),
    t('task.reconstruction'),
    t('task.superresolution'),
    t('task.registration'),
]

export const modalityIdLabel = [
    t('modality.others'),
    t('modality.common'),
    t('modality.ct'),
    t('modality.mri'),
    t('modality.xray'),
    t('modality.pet'),
    t('modality.ultrasonic'),
    t('modality.wsi'),
    t('modality.ehr'),
    t('modality.biomarker')
];

export const organIds = {
    "1": "脾",
    "2": "右肾",
    "3": "左肾",
    "4": "胆囊",
    "5": "肝",
    "6": "胃",
    "7": "胰腺",
    "8": "右肾上腺",
    "9": "左肾上腺",
    "10": "左上肺叶",
    "11": "左下肺叶",
    "12": "右上肺叶",
    "13": "右中肺叶",
    "14": "右下肺叶",
    "15": "食管",
    "16": "气管",
    "17": "甲状腺",
    "18": "小肠",
    "19": "十二指肠",
    "20": "结肠",
    "21": "膀胱",
    "22": "前列腺",
    "23": "左肾囊肿",
    "24": "右肾囊肿",
    "25": "骶骨",
    "26": "S1椎",
    "27": "L5椎",
    "28": "L4椎",
    "29": "L3椎",
    "30": "L2椎",
    "31": "L1椎",
    "32": "T12椎",
    "33": "T11椎",
    "34": "T10椎",
    "35": "T9椎",
    "36": "T8椎",
    "37": "T7椎",
    "38": "T6椎",
    "39": "T5椎",
    "40": "T4椎",
    "41": "T3椎",
    "42": "T2椎",
    "43": "T1椎",
    "44": "C7椎",
    "45": "C6椎",
    "46": "C5椎",
    "47": "C4椎",
    "48": "C3椎",
    "49": "C2椎",
    "50": "C1椎",
    "51": "心脏",
    "52": "主动脉",
    "53": "肺静脉",
    "54": "头臂干",
    "55": "右锁骨下动脉",
    "56": "左锁骨下动脉",
    "57": "右颈总动脉",
    "58": "左颈总动脉",
    "59": "左头臂静脉",
    "60": "右头臂静脉",
    "61": "左心耳",
    "62": "上腔静脉",
    "63": "下腔静脉",
    "64": "门静脉",
    "65": "左髂动脉",
    "66": "右髂动脉",
    "67": "左髂静脉",
    "68": "右髂静脉",
    "69": "左肱骨",
    "70": "右肱骨",
    "71": "左肩胛骨",
    "72": "右肩胛骨",
    "73": "左锁骨",
    "74": "右锁骨",
    "75": "左股骨",
    "76": "右股骨",
    "77": "左髋骨",
    "78": "右髋骨",
    "79": "脊髓",
    "80": "左臀大肌",
    "81": "右臀大肌",
    "82": "左臀中肌",
    "83": "右臀中肌",
    "84": "左臀小肌",
    "85": "右臀小肌",
    "86": "左腰肌",
    "87": "右腰肌",
    "88": "左髂腰肌",
    "89": "右髂腰肌",
    "90": "大脑",
    "91": "颅骨",
    "92": "左肋骨",
    "93": "左肋骨",
    "94": "左肋骨",
    "95": "左肋骨",
    "96": "左肋骨",
    "97": "左肋骨",
    "98": "左肋骨",
    "99": "左肋骨",
    "100": "左肋骨",
    "101": "左肋骨",
    "102": "左肋骨",
    "103": "左肋骨",
    "104": "右肋骨",
    "105": "右肋骨",
    "106": "右肋骨",
    "107": "右肋骨",
    "108": "右肋骨",
    "109": "右肋骨",
    "110": "右肋骨",
    "111": "右肋骨",
    "112": "右肋骨",
    "113": "右肋骨",
    "114": "右肋骨",
    "115": "右肋骨",
    "116": "胸骨",
    "117": "肋软骨"
};

interface OptionItem {
    value: number,
    label: string
}

function makeElementPlusOptions(object: Record<string, string>): OptionItem[] {
    const options = [];
    let othersKey = '';
    for (const key of Object.keys(object)) {
        if (object[key] === 'others') {
            othersKey = key;
            continue;
        }
        options.push({
            value: parseInt(key),
            label: object[key]
        });
    }
    if (othersKey.length > 0) {
        options.push({
            value: parseInt(othersKey),
            label: object[othersKey]
        });
    }

    return options;
}

export const taskOptions = makeElementPlusOptions(taskIds);
export const modalityOptions = makeElementPlusOptions(modalityIds);
export const organOptions = makeElementPlusOptions(organIds);
