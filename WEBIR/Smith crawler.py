#!/usr/bin/env python
# coding: utf-8

# In[61]:


import requests
from requests.exceptions import HTTPError

headers = {
    'User-Agent': 'Agent Smith 0.1',
    'From': 'matimon.n@ku.th'
}
e=0
seed_url = 'https://www.ku.ac.th/'
def get_page(url):
    global e
    global headers
    text = ''
    try:
        response = requests.get(url, headers=headers, timeout=2)
        # If the response was successful, no Exception will be raised
        response.raise_for_status()
    except HTTPError as http_err:
        print(f'HTTP error occurred: {http_err}')  # Python 3.6
        e=e+1;
    except Exception as err:
        print(f'Other error occurred: {err}')  # Python 3.6
        e=e+1;
    else:
#         print('Success!')
        text = response.text
    return text.lower()


# In[62]:


def link_parser(raw_html):
    urls = [];
    pattern_start = '<a href="';  pattern_end = '"'
    index = 0;  length = len(raw_html)
    while index < length:
        start = raw_html.find(pattern_start, index)
        if start > 0:
            start = start + len(pattern_start)
            end = raw_html.find(pattern_end, start)
            link = raw_html[start:end]
            if len(link) > 0:
                if link not in urls:
                    urls.append(link)
            index = end
        else:
            break
    return urls


# In[63]:


def Diff(li1, li2):
    return list(set(li1) - set(li2)) + list(set(li2) - set(li1))
#====================================================================
from urllib.parse import urljoin

def url_nor(extracted_links):
    base_url = 'https://www.ku.ac.th/'
    domain = '.ku.ac.th'
    not_be_there=['.arj','.asf','.asx','.asp','.au','.avi','.bmp','.cab','.cdf','.svg'
                  ,'.cdr','.cfm','.cgi','.class','.cmx','.css','.csv','.dir','.dxr'
                  ,'.dcr','.dll','.doc','.exe','.gif','.gz','.gzip','.hqx','.idc'
                  ,'.img','.jar','.jpg','.jpeg','.js','.la','.lma','.mid','.midi'
                  ,'.mov','.qt','.mpg','.mpeg','.mp2','.mp3','.mp4','.pcx','.pdf'
                  ,'.pl','.plx','.png','.pov','.ppm','.ps','.ra','.ram','.rm','.reg'
                  ,'.rtf','.tga','.tif','.tiff','.wav','.wri','.wrl','.vrml','.xbm'
                  ,'.xml','.zip','.txt','.xlsx','.xls','.ppt','.php','.url','*']
    abs_link = []
    ku_link = []
    not_use = []
    nor_link = []
    
    for ex in extracted_links:
      abs_link.append(urljoin(base_url, ex))

    for link in abs_link:
      result = urlparse(link)
      templink=result.netloc
      if domain in templink:
          ku_link.append(link)
            
    for k in ku_link:
        for i in not_be_there:
            if i in k :
                not_use.append(k)

    nor_link=Diff(ku_link,not_use)
            
    return nor_link


# In[64]:



l=0;
host_url=[];
from urllib.parse import urlparse 
import os, codecs
def path_store(url,raw):
    global l
    global host_url
    global e
    if ' ' in url:
        url=url.replace(" ", "")

    if url[-1]=='/':
        url=url[0:len(url)-1]
        
    print(url)
    result = urlparse(url)
    host=result.scheme+'://'+result.netloc
    
    if host not in host_url:
        host_url.append(host)

        
    filepath = 'html/' + result.netloc + result.path[:result.path.rfind('/')]
    filename = result.path[result.path.rfind('/')+1:]
    
    
    if len(result.path) < 150:
        #prevent weboutsite query 
        if url.count(":") > 1:
            l=l+1;
            print('have alot :')
        elif '.html' in filename:   
            path=filepath
            os.makedirs(path, 0o755, exist_ok=True)
            abs_file = path + '/' + filename
            try:
                f = codecs.open(abs_file, 'w', 'utf-8')
                f.write(raw)
                f.close()
            except:
                l=l+1;
        #query site 
        elif result.query != '' :
            if len(result.query) < 150:
                path=filepath+'/'+filename+result.query
                os.makedirs(path, 0o755, exist_ok=True)
                abs_file = path + '/smith'
                try:
                    f = codecs.open(abs_file, 'w', 'utf-8')
                    f.write(raw)
                    f.close()
                except:
                    l=l+1
            else:
                l=l+1;
                print('too long query')
                print('================')
        #non html
        else:
            path=filepath+'/'+filename
            os.makedirs(path, 0o755, exist_ok=True)
            abs_file = path + '/smith'
            try:
                f = codecs.open(abs_file, 'w', 'utf-8')
                f.write(raw)
                f.close()
            except:
                l=l+1;
    else:
        l=l+1;
        print('too long name')
        print('- - - - - - - - - - - -')


# In[65]:


robot=[]
sitemap=[]
def check_robot_sitemap(host):
    global robot
    global sitemap
    domain = '.ku.ac.th'
    print("===== phase check robot and sitemap =>txt =====")
    for url in host:
        check = url + '/robots.txt'
        raw_html = get_page(check)
        if 'user-agent' in raw_html:
#           robot.append(url+'/robots.txt')
            robot.append(url)
        if 'sitemap' in raw_html:
            sitemap.append(url)
            
    with open('list_robots.txt', 'w') as r:
        for item in robot:
            r.write("%s\n" % item)
    with open('list_sitemap.txt', 'w') as s:
        for item in sitemap:
            s.write("%s\n" % item)
    print("===== finish check =====")


# In[66]:


seed_url = 'https://www.ku.ac.th/th/'
frontier_q = [seed_url]
visited_q = []

# param 'links' is a list of extracted links to be stored in the queue
def enqueue(links):
    global frontier_q
    for link in links:
        if link not in frontier_q and link not in visited_q:
            frontier_q.append(link)

# FIFO queue
def dequeue():
    global frontier_q
    current_url = frontier_q[0]
    frontier_q = frontier_q[1:]
    return current_url


# In[ ]:

# e = error get_page raw_html='' can store
# l = long name or smthng cant store
#--- main process ---#
while len(visited_q) < 5000 + l:
    current_url = dequeue()
    visited_q.append(current_url)
    raw_html = get_page(current_url)
    extracted_links = link_parser(raw_html)
    nor_links = url_nor(extracted_links)
    enqueue(nor_links)
    path_store(current_url,raw_html) 
#   print('f:',len(frontier_q))
    print('v:',len(visited_q))
    print('- - - - - - - - - - - -')
check_robot_sitemap(host_url)
print("<======================================================>")







