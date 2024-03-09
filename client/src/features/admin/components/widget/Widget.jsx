import "./widget.css";
import earning from "./img/1.jpeg";
import teacher from "./img/2.jpeg"
import parents from "./img/3.jpeg"
import student from "./img/4.jpeg"


const Widget = ({ type }) => {
  let data;


  //temporary
  const amount = 500;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "STUDENTS",
        quantity:150000,
        icon: (
          <img
            className="icon"
            src={student}
            style={{
              color: "crimson",

            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        title: "TEACHERS",
        quantity:2250,
        icon: (
          <img
            className="icon"
            src={teacher}
            style={{
              color: "crimson",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "All USERS",
        quantity:5690,
        icon: (
          <img
            className="icon"
            src={parents}
            style={{
              color: "crimson",

            }}
          />
        ),
   
      };
      break;
    case "balance":
      data = {
        title: "EARNING",
        quantity:"$193000",
        icon: (
          <img
            className="icon"
            src={earning}
            style={{
              color: "crimson",
              
            }}
          />
        ),

      };
      break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
            {data.quantity}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
        </div>
        {data.icon}
      </div>
    </div>

  );
};

export default Widget;
