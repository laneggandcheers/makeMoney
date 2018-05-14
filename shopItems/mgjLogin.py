import urllib.request as urllib2
import json



def login():
    ua_headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Cookie': '__mgjuuid=6aa16400-36b9-42f6-b083-54a414415c85; _mwp_h5_token_enc=44b148d793c766d72d161d2366a08b69; _mwp_h5_token=955ce45cb24b1816fc39498c93381153_1525363582490; _ga=GA1.2.2080184779.1525363583; FRMS_FINGERPRINTN=X8nOondNSem1Z1hBecW59wEu-J7sXfnX7Hh-eIasy4PDe; FRMS_FINGERPRINT=13910000000000000000142100000000000000001401b326b5062b2f0e691291502f1bd97b0e7d801281d3d9446802a442591311b4138ea645a56db712511ff1de774005f8da12610000000000000000141100000000000000001331e4da3b7fbbce23451351a87ff679a2f3e71d2b01d9bb9697763b857b1341c9f0f895fb98ab91130187374a5ff147c45612018e6691aa4674186f00913469208c3afd917712312e65f2f2fdaf6c6901010765a50648bfaaba1271d3d9446802a44259132168934a3e9455fa721221da11e8cd1811acb71381b326b5062b2f0e6912117a53928fa4dd31e81371dfa004ad8ed498721241da11e8cd1811acb713610000000000000000; _OkLJ_%UJ=XKIT9RJSAV6WSNH9',
        'Referer': 'http://union.mogujie.com/tools/stock?ptp=1.GHaKib.0.0.6ApwYt7'
    }
    reqUserInfo = urllib2.Request('http://union.mogujie.com/effect/cpsUser/getCpsUserInfo', headers = ua_headers)
    # response = urllib.urlopen(request)  
    respUserInfo = urllib2.urlopen(reqUserInfo)
    # 服务器返回的类文件对象支持python文件对象的操作方法
    respUserInfoDetail = respUserInfo.read()
    print(respUserInfoDetail)
    userResp = json.loads(respUserInfoDetail.decode('utf-8'))
    if userResp['status']['code'] == 1001:
        return True
    print('go on')

 
reqUserInfo = urllib2.Request('http://union.mogujie.com/effect/cpsUser/getCpsUserInfo', headers = ua_headers)
# response = urllib.urlopen(request)  
respUserInfo = urllib2.urlopen(reqUserInfo)
# 服务器返回的类文件对象支持python文件对象的操作方法
respUserInfoDetail = respUserInfo.read()
userResp = json.loads(respUserInfoDetail.decode('utf-8'))
if userResp['status']['code'] == 1001:
    print('check user true')
else:
    exit()