import {withSession} from 'next-session'



const withAuthentication = WrappedComponent => {
  const RequiresAuthentication = props => {

   useEffect(() => {
     // if a there isn't a logged in user and their role has been set to "guest"
     // then redirect them to "/signin"
    if(role === "guest") Router.push("/signin");
   }, [role]);

     // if there's a loggedInUser, show the wrapped page, otherwise show a loading indicator
    return role && role !== "guest" ? <WrappedComponent {...props} /> : <div>Loading...</div>;
  };

  return RequiresAuthentication;
};


export async function getServerSideProps(context) {
    let {req, res} = context
    console.log(req)
    if(req.session.uid != null){
        res.redirect('/login')
    }
    return {
      props: {}, // will be passed to the page component as props
    }
  }

export default withSesstion(withAuthentication);