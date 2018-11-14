module.exports = {
    res : function(result) {
        let data = new Array();
        
        for (i = 0; i < result.length; i++) {
            let temp = {
                user_ID:'',
                name:'',
                profile_url:''
            }
            temp.user_ID = result[i].user_ID;
            temp.name = result[i].name;
            temp.profile_url = result[i].profile_url;
            
            
            data.push(temp);
        }
        return data;
    }   
}