/**
 * Created by 1 on 2017/3/29.
 */
// Mock.mock( template )
var template = {
  'data|1-10': [{

    'title': '测试标题',
    'id': Math.random(),
    'author': '测试作者',
    'description': '测试简介测试简介测试简介测试简介测试简介测试简介测试简介测试简介测试简介测试简介',

    'addtime': "2017-03-29 12:00:00",
    'type': ['计算机', '计算机', '计算机'],
    'job': ['计算机', '计算机', '计算机'],
    'n_love|1-100': 1,
    'n_comment|1-100': 1,

    'vhtml': "",
    'cover': "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490763917931&di=ef14ff0cf7523b9ba64c6e338be4178f&imgtype=0&src=http%3A%2F%2Fimg01.taopic.com%2F161007%2F240373-16100FR12449.jpg"
  }]
}
export const list = Mock.mock(template)

var filterTemplate = [[{
  value: '1',
  label: '全部'
}, {
  value: '2',
  label: '金融'
}, {
  value: '3',
  label: '养生'
}, {
  value: '4',
  label: '计算机'
}], [{
  value: '5',
  label: '直播回顾'
}]]

export const filter1 = Mock.mock(filterTemplate)

var filter2Template = [{
  value: '1',
  label: '全部'
}, {
  value: '2',
  label: '金融'
}, {
  value: '3',
  label: '养生'
}, {
  value: '4',
  label: '计算机'
}, {
  value: '5',
  label: '直播回顾'
}]

export const filter2 = Mock.mock(filter2Template)

import emoji from "filters/emoji";

var studyTemplate = {
  'id': "2",
  'title|2-3': "新版ETC办理技巧测试标题",
  'headerimg': "https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490859211&di=00acc596e260316879dd68ac0b9fac7c&src=http://img3.duitang.com/uploads/item/201508/16/20150816231615_SwvhH.thumb.700_0.jpeg",
  'name': "金朝祥",
  'author': "8581234",
  'addtime': "2017-03-30",
  'vhtml': "<p>具体内容</p>" +
  "<p>具体内容</p>",
  'avrate': '4.7',
  'commentList|1-10': [{
    'id': Math.random(),
    'headerimg': 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490859211&di=00acc596e260316879dd68ac0b9fac7c&src=http://img3.duitang.com/uploads/item/201508/16/20150816231615_SwvhH.thumb.700_0.jpeg',
    'name': '金朝祥',
    'content': emoji('留言测试留言测/撇嘴/试留言测试留言测试留言测试！/色/'),
    'addtime': '2017-03-30 13:46'
  }]
}

export const study = Mock.mock(studyTemplate)

var commentListTemplate = {
  'id': '2',
  'headerimg': 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490859211&di=00acc596e260316879dd68ac0b9fac7c&src=http://img3.duitang.com/uploads/item/201508/16/20150816231615_SwvhH.thumb.700_0.jpeg',
  'name': '金朝祥',
  'content': emoji('留言测试留言测/撇嘴/试留言测试留言测试留言测试！/色/'),
  'addtime': '2017-03-30 13:46',
  'list|1-10': [{
    'id': Math.random(),
    'headerimg': 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1490859211&di=00acc596e260316879dd68ac0b9fac7c&src=http://img3.duitang.com/uploads/item/201508/16/20150816231615_SwvhH.thumb.700_0.jpeg',
    'name': '金朝祥',
    'content': emoji('留言测试留言测/撇嘴/试留言测试留言测试留言测试！/色/'),
    'addtime': '2017-03-30 13:46'
  }]
}

export const commentList = Mock.mock(commentListTemplate)


