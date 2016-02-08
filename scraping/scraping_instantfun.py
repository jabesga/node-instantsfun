from lxml import html
import requests

page = requests.get('http://www.instantsfun.es/')
tree = html.fromstring(page.content)
names = tree.xpath('/html/body/div[3]/div/div/div[1]/div[2]/ul/li/h2/a/text()')
colors = tree.xpath('//*[@id="instant_buttons"]//@class')
categories = tree.xpath('/html/body/div[3]/div/div/div[1]/div[2]/ul/li/div[2]/a/@href')
sound_urls = tree.xpath('/html/body/div[3]/div/div/div[1]/div[2]/ul/li/div/audio/source/source/@src')

if len(names) == len(colors) == len(categories) == len(sound_urls):
    
    f = open('scraped_database.csv', 'w')
    f.write('name,color,category,sound_url\n')

    for element in range(0,len(names)):
        seq = (names[element],colors[element],categories[element].split('/')[3],'http://www.instantsfun.es' + sound_urls[element])
        f.write(','.join(seq))
        f.write('\n')

    f.close()