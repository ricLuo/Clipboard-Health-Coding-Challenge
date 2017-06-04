import Record from './MyRecord';

export default (req, res) => {
  Record.find().then((records) =>{
          res.json({
            records: records,
            success: true,
          });
        }).catch((err) => {
          res.json({
            err,
            success: false,
          });
        });
};
