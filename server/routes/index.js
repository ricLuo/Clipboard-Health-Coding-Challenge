/* eslint-disable global-require */
import 'dotenv/config';
import reactApp from './views/app';
import MyRecord from '../../myFolder/model/MyRecord';

const routes = (app) => {

  /* example api route */
  app.get('/api/records', require('./api/records'));

  // my data records
  app.get('/api/myRecords', (req, res) => {
    MyRecord.find(function(err, record){
      if(err){
        res.send(err);
      }
      res.json(record);
    });
  });

  reactApp(app); // set up react routes
};

export default routes;
/* eslint-enable global-require */
