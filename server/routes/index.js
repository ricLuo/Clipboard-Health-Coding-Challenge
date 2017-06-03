/* eslint-disable global-require */
import 'dotenv/config';
import reactApp from './views/app';
import Record from '../../myFolder/model/Record';

const routes = (app) => {

  /* example api route */
  // app.get('/api/records', require('./api/records'));

  // my data records
  app.get('/api/myRecords', (req, res) => {
    Record.find(function(err, record){
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
