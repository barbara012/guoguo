module.exports = function (app) {
    app.get('/', function (req, res) {
        var deviceAgent = req.headers['user-agent'].toLowerCase();
        var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
        if(agentID){
            res.render('./m/index', {
                title: 'hwh'
            });
        }else{
            res.render('index', {
                title: 'hwh'
            });
        }
    });
};