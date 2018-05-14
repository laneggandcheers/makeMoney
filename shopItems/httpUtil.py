import urllib.request as urllib2
import json

def getDefaultHttpHeaders():
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36',
        'Cookie': '__mgjuuid=6aa16400-36b9-42f6-b083-54a414415c85; _mwp_h5_token_enc=44b148d793c766d72d161d2366a08b69; _mwp_h5_token=955ce45cb24b1816fc39498c93381153_1525363582490; _ga=GA1.2.2080184779.1525363583; FRMS_FINGERPRINTN=X8nOondNSem1Z1hBecW59wEu-J7sXfnX7Hh-eIasy4PDe; FRMS_FINGERPRINT=13910000000000000000142100000000000000001401b326b5062b2f0e691291502f1bd97b0e7d801281d3d9446802a442591311b4138ea645a56db712511ff1de774005f8da12610000000000000000141100000000000000001331e4da3b7fbbce23451351a87ff679a2f3e71d2b01d9bb9697763b857b1341c9f0f895fb98ab91130187374a5ff147c45612018e6691aa4674186f00913469208c3afd917712312e65f2f2fdaf6c6901010765a50648bfaaba1271d3d9446802a44259132168934a3e9455fa721221da11e8cd1811acb71381b326b5062b2f0e6912117a53928fa4dd31e81371dfa004ad8ed498721241da11e8cd1811acb713610000000000000000; _OkLJ_%UJ=XKIT9RJSAV6WSNH9',
        'Referer': 'http://union.mogujie.com/tools/stock?ptp=1.GHaKib.0.0.6ApwYt7'
    }
    return headers

def httpGet(url , clientHeaders):
    request = urllib2.Request(url, headers = clientHeaders)
    response = urllib2.urlopen(request)
    responseDetail = response.read()
    if response.getcode() != 200:
        return None
    utf8detail = responseDetail.decode('utf-8')
    detailLength = len(utf8detail)
    if utf8detail.startswith('null'):
        return json.loads(utf8detail[5:detailLength-1])
    else:
        return json.loads(utf8detail)
    
