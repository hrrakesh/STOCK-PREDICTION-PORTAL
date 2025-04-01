import React from 'react'
import Button from "./Button";



const Main = () => {
  return (
    <>
      <div className="container">
        <div className="p-5 text-center bg-light-dark">
          <h1 className="text-light">Stock Prediction App</h1>
          <p className="text-light lead">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi,
            commodi adipisci tempore, delectus necessitatibus nulla modi
            inventore ratione nobis, ad dignissimos nesciunt labore sunt eaque
            fugiat placeat cum impedit unde! Impedit sed in voluptatibus
            exercitationem modi beatae nam voluptate vero quis ad! Delectus,
            neque tenetur nesciunt repellat id expedita mollitia minima quos?
            Fugiat maiores harum amet nobis voluptatibus inventore, blanditiis
            in quia at assumenda quo officiis quidem earum saepe et accusantium
            odio expedita a deserunt eligendi sit. Dolorum sed voluptatibus
            aspernatur illo quam soluta quae illum deserunt voluptas,
            praesentium dolores fugiat distinctio nihil modi ab tempora
            obcaecati ipsam perferendis rem?
          </p>

          <Button text="Login" class="btn-info" url="/login"/>
        </div>
      </div>
    </>
  );
}

export default Main