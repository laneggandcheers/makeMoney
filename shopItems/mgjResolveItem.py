import time

#处理商品列表
def getItems(moduleList):
    moduleListSize = len(moduleList)
    index = 0
    while index < moduleListSize:
        items = moduleList[index]['items']
        itemsSize = len(items)
        subIndex = 0
        while subIndex < itemsSize:
            item = items[subIndex]
            print('商品id:'+str(item['tradeItemId']))
            print('商品名称:'+item['title'])
            print('折扣价:'+str(item['discountPrice']))
            print('最终价:'+str(item['finalPrice_it']))
            print('促销价格:'+str(item['cutPrice']))
            # print('优惠价:'+str(item['sale']))
            print('优惠券数量:'+str(item['campaignResourceMax']))
            print('佣金比例:'+str(item['commission_it']/1000))
            print('佣金:'+str(item['commission_it']/1000*((item['discountPrice']-item['cutPrice'])/100)))
            # print('促销开始时间:'+  str(item['promotionStartTime']))
            # print('促销结束时间:'+str(item['promotionEndTime']))
            print('促销开始时间:'+  time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(item['promotionStartTime'])))
            print('促销结束时间:'+  time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(item['promotionEndTime'])))
            if 'freeDelivery' in item:
                print('包邮:'+str(item['freeDelivery']))
            if 'refundIn7' in item:
                print('7天无条件退款'+ str(item['refundIn7']))
            if 'refundInsurance' in item:
                print('退还保险费:'+str(item['refundInsurance']))
            if 'deliverTime' in item:
                print('发货时间（小时）:'+str(item['deliverTime']))
                
            print('------------------------------')
            subIndex += 1
        index += 1

# def getItems(items):
#     itemsSize = len(items)
#     subIndex = 0
#     while subIndex < itemsSize:
#         item = items[subIndex]
#         print('商品id:'+str(item['tradeItemId']))
#         print('商品名称:'+item['title'])
#         print('折扣价:'+str(item['discountPrice']))
#         print('最终价:'+str(item['finalPrice_it']))
#         print('促销价格:'+str(item['cutPrice']))
#         # print('优惠价:'+str(item['sale']))
#         print('优惠券数量:'+str(item['campaignResourceMax']))
#         print('佣金比例:'+str(item['commission_it']/1000))
#         print('佣金:'+str(item['commission_it']/1000*((item['discountPrice']-item['cutPrice'])/100)))
#         # print('促销开始时间:'+  str(item['promotionStartTime']))
#         # print('促销结束时间:'+str(item['promotionEndTime']))
#         print('促销开始时间:'+  time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(item['promotionStartTime'])))
#         print('促销结束时间:'+  time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(item['promotionEndTime'])))
#         print('包邮:'+str(item['freeDelivery']))
#         print('7天无条件退款'+ str(item['refundIn7']))
#         print('退还保险费:'+str(item['refundInsurance']))
#         print('发货时间（小时）:'+str(item['deliverTime']))
#         print('------------------------------')
#         subIndex += 1