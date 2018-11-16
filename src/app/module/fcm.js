const db = require('../module/pool.js');
const FCM = require('fcm-node');
const fcmserverkey = require('../../config/fcmserverkey').key;
const fcm = new FCM(fcmserverkey);

module.exports = {

  send: async (...args) => {

    let user_idx = args[0];
    let msg = args[1];

    // fcm_token 조회
    let fcmTokenQuery = 'select * from USER where user_idx=?'
    let fcmTokenResult = await db.execute2(fcmTokenQuery, user_idx);

    console.log(1,fcmTokenResult);

    /** 발송할 Push 메시지 내용 */
    let client_token = fcmTokenResult[0].fcm_token;
    let name = fcmTokenResult[0].name;

    console.log(2, client_token);
    console.log(3, name);

    let push_data = {

      // 수신대상
      to: client_token,

      // App이 실행중이지 않을 때 상태바 알림으로 등록할 내용
      notification: {
        name:name,
        body: msg,
        sound: "default",
        click_action: "FCM_PLUGIN_ACTIVITY"
      },

      // 메시지 중요도
      priority: "high",
      // App 패키지 이름
      restricted_package_name: "com.kb.challenge.app.today.today_android",


    };

    fcm.send(push_data, function (err, response) {

      if (err) {
        return -1;
      }

      console.log("Push메시지가 발송되었습니다.");
    });

    return;
  }
}