import os
import argparse

import json

def make_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--ls', action='store_true')
    parser.add_argument('--c', action='store_true')
    parser.add_argument('--root', type=str, default='./src/i18n')
    args = parser.parse_args()
    return args

def read_all_json(root='./src/i18n'):
    json_file = [json_file for json_file in os.listdir(root) if json_file.endswith('.json')]
    json_data_collection = {}
    for file in json_file:
        json_path = os.path.join(root, file)
        json_data = json.load(open(json_path, 'r', encoding='utf-8'))
        json_name = file.replace('.json', '')
        json_data_collection[json_name] = json_data
    return json_data_collection

if __name__ == '__main__':
    args = make_args()
    json_data_collection = read_all_json(args.root)
    
    if args.ls:
        for i18n_key in json_data_collection['en']:
            print('-> ', i18n_key)
    elif args.c:
        while True:
            i18n_key = input('enter i18n key:').strip()
            if i18n_key == 'q':
                break
            if i18n_key:
                if i18n_key not in json_data_collection['en'].keys():
                    value = input('enter value:').strip()
                    if value:
                        for key in json_data_collection.keys():
                            json_data_collection[key][i18n_key] = value
                else:
                    print(f'{i18n_key} already exists')
        
        for key in json_data_collection.keys():
            json_name = key + '.json'
            json_path = os.path.join(args.root, json_name)
            with open(json_path, 'w', encoding='utf-8') as fp:
                json.dump(json_data_collection[key], fp, indent=4, ensure_ascii=False)