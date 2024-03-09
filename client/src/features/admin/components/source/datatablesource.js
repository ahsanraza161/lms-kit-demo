export const userColumns = [
  { field: "id", headerName: "Roll_No", width: 70 },
  {
    field: "name",
    headerName: "Name",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "age",
    headerName: "Age",
    width: 100,
  },
  {
    field: "gender",
    headerName: "Gender",
    width: 160,
  },
  {
    field: "class",
    headerName: "Class",
    width: 160,
  },
  {
    field: "section",
    headerName: "Section",
    width: 160,
  },
  {
    field: "address",
    headerName: "Address",
    width: 160,
  },
  {
    field: "phone_no",
    headerName: "Phone no ",
    width: 160,
  },
];
export const userRows = [
    
  {
    id: 1,
    name: "Abdullah",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    gender: "Male",
    email: "1s@gmail.com",
    age: 23,
    class:10,
    section:"A" ,
    address: "A-1289",
    phone_no :"+123",
  },
  {
    id: 2,
    name: "Haris",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    gender: "Male",
    age: 20,
    class:10,
    section:"B",
    address: "A-1200",
    phone_no :"+123",
  },
  {
    id: 3,
    name: "Ayesha",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    gender: "Female",
    age: 19,
    class:7,
    section:"A" ,
    address: "B-1389",
    phone_no :"+123",
  },
  {
    id: 4,
    name: "Irfan",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    gender: "Male",
    age: 14,
    class:7,
    section:"B" ,
    address: "B-128",
    phone_no :"+123",
  },
  {
    id: 5,
    name: "Tooba",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    gender: "Female",
    age: 22,
    class:8,
    section:"A" ,
    address: "E-1111",
    phone_no :"+123",
  },
  {
    id: 6,
    name: "Laiba",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    gender: "Female",
    age: 18,
    class:9,
    section:"C" ,
    address: "A-block",
    phone_no :"+123",
  },
  {
    id: 7,
    name: "Ahmed",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    gender: "Male",
    age:22,
    class:5,
    section:"C" ,
    address: "DHA phase-2",
    phone_no :"+123",
  },
  {
    id: 8,
    name: "Samra",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    gender: "Female",
    age: 16,
    class:7,
    section:"A" ,
    address: "D-234",
    phone_no :"+123",
  },

];
