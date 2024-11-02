import requests as r
import os
import shutil
import zipfile

# 下载 压缩包
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36',
    'Cookie': 'EGG_SESS_ICONFONT=Hu68kBY7XO7C6Udp3T99M1asKmUZ0gxjps8xjTrjx4ZtNCIR_nFu9Li15nxoPAWLmGlcEMN2KEQyAvgBfASR3cSsmd2lhqg89lUmApzbWgBgCWjMwMzjawMqh2KNT8kCICxit3iWC7YLdUuCdUfXg_cGkRjPNvDohqyeHF27gTb5CloBSvLjqN45PcUvcUig',
    'Pragma': 'no-cache',
    'sec-fetch-mode': 'navigate'
}

url = 'https://www.iconfont.cn/api/project/download.zip?spm=a313x.manage_type_myprojects.i1.d7543c303.43333a81S1UbBJ&pid=4343986&ctoken=cJbdD9qha65tIFXXR6y9_je6'
res = r.get(url, headers=headers)

if res.status_code:
    with open('./scripts/tmp.zip', 'wb') as fp:
        fp.write(res.content)

# 解压文件
with zipfile.ZipFile('./scripts/tmp.zip', 'r') as zipf:
    zipf.extractall('./scripts/tmp')

# 将文件搬运至工作区，我的 css 全放在 src/assets/fonts 下面了，你的视情况而定
for parent, _, files in os.walk('./scripts/tmp'):
    for file in files:
        filepath = os.path.join(parent, file)
        if file.startswith('demo'):
            continue
        if file.endswith('.css'):
            content = open(filepath, 'r', encoding='utf-8').read().replace('font-size: 16px;', '')
            open(filepath, 'w', encoding='utf-8').write(content)
            shutil.move(filepath, os.path.join('./src/assets/fonts', file))
        elif file.endswith('.woff2'):
            shutil.move(filepath, os.path.join('./src/assets/fonts', file))

# 删除压缩包和解压区域
os.remove('./scripts/tmp.zip')
shutil.rmtree('./scripts/tmp')