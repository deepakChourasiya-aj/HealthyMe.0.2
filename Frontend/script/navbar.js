document.getElementById(
  "navbar-healthyme"
).innerHTML = ` <a class="navbar-brand" href="index.html">
<!-- <img src="../images/Healthy.png"  alt="Bootstrap" id="logo"> -->
<b id="brand">HealthyMee</b>
</a>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
<ul class="navbar-nav mr-auto">
    <li class="nav-item active">
        <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
    </li>
    <li class="nav-item">
        <a class="nav-link" href="#">Protein</a>
    </li>
    <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Category
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">Something else here</a>
        </div>
    </li>
</ul>
<form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" id="search-value" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-success" id="search-input" type="submit">Search</button>

</form>
</div>
<button class="btn btn-outline-success my-2 my-sm-0" id="Signup" style="background-color: chartreuse;"><a
    id="signup-to-name" href="./html/signup.html">Signup</a></button>
<button class="btn btn-outline-success my-2 my-sm-0" id="checkout"><a href="./checkout.html"><img
        width="30" height="30" src="./images/checkout.png" alt=""></a></button>`;
