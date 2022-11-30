export default function if_first() {
    if (typeof req.session.id0 !== "undefined") {
      req.session.id0 = req.session.id
      
      console.log(`Added id0: ${req.session.id0}`)
    };
    console.log(`id0: ${req.session.id0}`)
  };