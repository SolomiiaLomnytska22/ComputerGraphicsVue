<template>
<div class = "container">
    <img class = "logo" src="../assets/Logo.svg" alt="Logo">
    <div class="description">We are two young software engineering students from Lviv Politechnic National University. This is our Computer Graphics project.</div>
    <div class = "social">
        <img src="../assets/001-facebook.svg" alt="Facebook">
        <img src="../assets/003-twitter.svg" alt="Twitter">
        <img src="../assets/004-instagram.svg" alt="Instagram">
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container
{
    background-color: #04101A;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo{
    height: 65px;
    padding: 60px 0;
}
.description
{
    color: #FFF;
    opacity: 0.5;
    text-align: center;
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
    font-weight: 400;
    max-width: 380px;
}
.social
{
    width: 150px;
    display: flex;
    padding: 60px 0;
    justify-content: space-between;
}

</style>