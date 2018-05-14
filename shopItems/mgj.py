import httpUtil
import mgjResolveItem


allTotal = 100
pageSize = 50
pageNo = 1
url = 'http://union.mogujie.com/jsonp/proms/1?getAll=true'
# 全部商品
while allTotal/pageSize >= pageNo:
    allItemObj = httpUtil.httpGet(url + '&pageNo=' + str(pageNo) + '&pageSize=' + str(pageSize), httpUtil.getDefaultHttpHeaders())
    # allTotal = allItemObj['data']['moduleList']['total']
    allTotal = 100
    mgjResolveItem.getItems(allItemObj['data']['moduleList'])
    pageNo += 1








