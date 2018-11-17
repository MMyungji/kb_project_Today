const db = require('../module/pool.js');
const fcm = require('../module/fcm.js');
let saving = require('../model/schema/saving');

/**
푸시
1. 목표 금액에 도달했을 때 
2. 정확한 시간에 푸시 보내기 
3. 입금하였을 때
*/

const QUERY = 'select * from USER where user_idx = ?';

module.exports = {

    push_message : async (...args) => {
        const user_idx = args[0];

        var msg = "오늘 기분 어때요? 알려주세요!";
        
        fcm.send(user_idx, msg, function(err, response){
            if (err) {
                console.log("Push메시지 발송에 실패했습니다.");
                return;
            } 
            console.log("Push메시지가 발송되었습니다.", response);
        });
    },

    //postSaving 성공시, pushmessage
    saveMoney : async (...args) => {
        const user_idx = args[0];

        var totalMoney = 0;

        let query = 'select * from USER where user_idx = ?';
        let goal = await db.execute2(query,user_idx);

        if(!goal || goal == undefined){
            return -1;
        }else{
            let name = goal[0].name;
            let goalMoney = goal[0].goal_money;

            await saving.find({
                user_idx: user_idx
            }, async function (err, result) {
                if (err) {
                    return -1;
                } else {
                  for (let i = 0; i < result.length; i++) {
                      totalMoney += result[i].saving_money;
                  }
              }
          });

            if(goalMoney == totalMoney){
                var msg = "목표 금액에 도달했어요!";
            }
            else{
                var msg = "저금통에" + totalMoney + "원이 쌓였어요! 조금만 힘내면 목표액에 도달합니다!";
            }
            var message = msg;

            await fcm.fcmSend(user_idx, message, function(err,res) {
               if (err) {
                  console.log("PUSH Failure. Something has gone wrong!");
                  return -1;
              } 
              console.log("Successfully PUSH sent with response: ", res);

          });
        }
    }
};
