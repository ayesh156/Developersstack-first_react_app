import "./App.css";

const users = [
  {
    code: 1,
    avatar: "img-3.png",
    name: "Thisara Lakshan",
    designation: "Graphic Designer",
    salary: "15000",
  },
  {
    code: 2,
    avatar: "img-1.jpg",
    name: "Thisara Lakshan",
    designation: "Graphic Designer",
    salary: "15000",
  },
  {
    code: 3,
    avatar: "img-2.jpg",
    name: "Eshara Uddipana",
    designation: "Graphic Designer",
    salary: "30000",
  },
  {
    code: 4,
    avatar: "img-4.jpg",
    name: "TRashan Lakshan",
    designation: "Angular Developer",
    salary: "35000",
  },
];

function UserManager() {
  return (
    <div className="wrapper">
      <SearchForm />
      <hr />

      {users.map((user) => {
        return <User {...user} key={user.code} />;
      })}
    </div>
  );
}

const SearchForm = () => {

  return (
    <div className="search-outer">
      <form onSubmit={(e) => {
    e.preventDefault();
    console.log('manageSubmitEvent');
  }}>
        <input type="search" onChange={(e) => {
    console.log(e.target.value);
  }} /> | <button type='submit' onClick={(e) => {
    console.log('manageClickEvent');
  }}>Search Now</button>
      </form>
    </div>
  )
}

const User = (props) => {
  const { code, avatar, name, designation, salary } = props;
  return (
    <div className="user-outer">
      <Avatar avatar={avatar} />
      <UserData code={code} name={name} designation={designation} salary={salary}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum velit,
        impedit id, minima voluptas veniam a aliquid cum fugiat quibusdam
        laudantium at? Dignissimos, blanditiis porro.
      </UserData>
    </div>
  );
};

const Avatar = ({ avatar }) => {
  return (
    <div className="avatar-outer">
      <img src={`${process.env.PUBLIC_URL}/images/${avatar}`} alt={avatar} />
    </div>
  );
};

const UserData = ({ name, designation, salary, code, children }) => {
  return (
    <div className="user-data">
      <UserName name={name} />
      <Designation designation={designation} />
      <Salary salary={salary} />
      <button style={{cursor:'pointer'}} type="button" onClick={(e) => {
        console.log(code);
      }}>Print Data</button>
      <br/>
      {children}
    </div>
  );
};

const UserName = ({ name }) => {
  const inlineStyle = {
    color: "#2980b9", margin: 5
  };
  return <h1 style={inlineStyle}>{name}</h1>;
};

const Designation = ({ designation }) => {
  return <h3 style={{ fontStyle: "italic", margin: 5 }}>{designation}</h3>;
};

const Salary = ({ salary }) => {
  return <h3 style={{ fontStyle: "italic", margin: 5 }}>{salary}</h3>;
};

export default UserManager;
