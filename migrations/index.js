const migrate = require("migrate");
 
migrate.load({
  stateStore: ".migrate"
}, (err, set) => {
  if (err) {
    throw err;
  } else {
    set.up(err => {
        if (err) {
          throw err;
        } else {
            console.log("migrations successfully ran");
        }
      });
  }
});