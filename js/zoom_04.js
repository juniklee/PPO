import * as THREE from "https://unpkg.com/three@0.108.0/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.108.0/examples/jsm/controls/OrbitControls.js";

let WIDTH = window.innerWidth;
let HEIGHT = window.innerHeight;
let scene, camera, renderer, controls;
let boxGroup = new THREE.Object3D();

let totalNum = 40; //전체 박스 갯수
const depthNum = 60; //박스와 박스 사이 z값. 깊이

let targetZNum = 0;
let moveZ = 0;
let mouseX = 0,
    mouseY = 0,
    moveX = 0,
    moveY = 0;

const dataArr = [
    {
        "image": "./image/오솔록.jpg", // 오솔록
        "link": "https://drive.google.com/file/d/1KqEs9sQmOmNYOW1HniPsaYyXf9Dtiwp9/view?usp=sharing",
    },
    {
        "image": "./image/나노드론.jpg" ,// 나노드론
        "link": "https://wixlabs-pdf-dev.appspot.com/assets/pdfjs/web/viewer.html?file=%2Fpdfproxy%3Finstance%3DhXF2gXP3c1BDHhNKoKU7nCpf7Ui3l4JbuJ6SSfiWO4w.eyJpbnN0YW5jZUlkIjoiMjczMjU4OGMtYzgwMy00OGY1LTljMTItYWM4MmNhNGVlNjAxIiwiYXBwRGVmSWQiOiIxM2VlMTBhMy1lY2I5LTdlZmYtNDI5OC1kMmY5ZjM0YWNmMGQiLCJtZXRhU2l0ZUlkIjoiZmZmMDIwM2UtOGEwMS00ZDZlLThjZjMtMjU5ZGRiOTVjYWFiIiwic2lnbkRhdGUiOiIyMDIyLTA3LTAzVDA1OjU1OjQzLjE4MloiLCJkZW1vTW9kZSI6ZmFsc2UsImFpZCI6IjBiMjZkODliLThlZDgtNDVjNC04NGVhLTBiYTIyMmQ1MmI0OCIsImJpVG9rZW4iOiJkOGMyNzhiMi00MjAyLTA1OWItMTBlMS04OTFmMTFkYjJjYWEiLCJzaXRlT3duZXJJZCI6Ijk4ZjJiMDk0LWQxMDctNDZhZC1iN2I3LWQ0M2I3NDM1OWRjZCJ9%26compId%3Dcomp-kz6nt7b3%26url%3Dhttps%3A%2F%2Fdocs.wixstatic.com%2Fugd%2F98f2b0_b1fce6b193be4dbe92b9ca3dd452ea6d.pdf#page=1&links=true&originalFileName=%EB%A6%AC%ED%8B%80%20%ED%8F%AC%EB%A0%88%EC%8A%A4%ED%8A%B8&locale=ko&allowDownload=true&allowPrinting=true",
    },
    {
        "image": "./image/junix.png", // 주닉스
        "link": "http://ksyeong0316.dothome.co.kr/0513/#1",
    },
    {
        "image": "https://source.unsplash.com/collection/4", // 주닉스 깃허브주소
        "link": "https://juniklee.github.io/testing-11/",
    },
    {
        "image": "https://source.unsplash.com/collection/5",
        "link": "http://google.com",
    },
    {
        "image": "https://source.unsplash.com/collection/6",
        "link": "http://google.com",
    },
    {
        "image": "https://source.unsplash.com/collection/6",
        "link": "http://google.com",
    },
    {
        "image": "https://source.unsplash.com/collection/6",
        "link": "http://google.com",
    },
    {
        "image": "https://source.unsplash.com/collection/6",
        "link": "http://google.com",
    },
];

const init = () => {
    totalNum = dataArr.length - 1; //전체 박스 갯수
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff"); //배경 컬러 #6fbdff
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 1, 1000);
    camera.position.set(0, 0, 50);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMap.enabled = true;
    //그림자 활성화
    // document.body.appendChild(renderer.domElement);
    document.querySelector("#canvasWrap").appendChild(renderer.domElement);
    //cavasWrap 에 render 넣는다

    document.body.style.height = `${HEIGHT + totalNum * 70}px`;
    //body 스크롤 만들기

    //안개
    const near = 5;
    const far = 300;
    const color = "white";
    scene.fog = new THREE.Fog(color, near, far);

    // const axes = new THREE.AxesHelper(150);
    // scene.add(axes);

    // const gridHelper = new THREE.GridHelper(240, 20);
    // scene.add(gridHelper);

    //조명 넣기
    var light = new THREE.HemisphereLight(0xffffff, 0x080820, 0.8);
    light.position.set(100, 100, 0);
    scene.add(light);

    // controls = new OrbitControls(camera, renderer.domElement);

    for (let i = 0; i <= totalNum; i++) {
        addBox(i);
    }
    scene.add(boxGroup);
    addLight(15, 15, 20);
};

//박스 추가
const addBox = (i) => {
    const imageMap = new THREE.TextureLoader().load(dataArr[i].image);
    // imageMap.wrapS = THREE.RepeatWrapping;
    // imageMap.wrapT = THREE.RepeatWrapping;
    // imageMap.repeat.set(4, 4);

    const material = new THREE.SpriteMaterial({ map: imageMap });
    const boxMesh = new THREE.Sprite(material);
    boxMesh.scale.set(100, 62, 1);

    let x = 0;
    let y = 0;
    let z = -i * depthNum;
    boxMesh.position.set(x, y, z);
    boxMesh.name = `imageBox_${i}`;
    boxMesh.link = dataArr[i].link;
    // boxMesh.rotation.set(0, y, 0);
    boxGroup.add(boxMesh);
};

//조명 넣기
const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 0.4;
    const light = new THREE.PointLight(color, intensity);
    light.castShadow = true;

    light.position.set(...pos);

    // const helper = new THREE.PointLightHelper(light);
    // scene.add(helper);

    scene.add(light);
};

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

const onPointerMove = (event) => {
    pointer.x = (event.clientX / WIDTH) * 2 - 1;
    pointer.y = -(event.clientY / HEIGHT) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    // 레이저 닿는 녀석 찾기
    const intersects = raycaster.intersectObjects(boxGroup.children);

    //마우스 오버가 된 녀석들은 빨간색으로
    // for (let i = 0; i < intersects.length; i++) {
    //     intersects[i].object.material.color.set(0xff0000);
    // }

    if (intersects.length > 0) {
        document.querySelector("body").style.cursor = "pointer";
    } else {
        document.querySelector("body").style.cursor = "auto";
    }
};

const onDocumentMouseDown = (event) => {
    const vector = new THREE.Vector3(pointer.x, pointer.y, 0.7);

    vector.unproject(camera);
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(boxGroup.children);

    if (intersects.length > 0) {
        const item = intersects[0].object;
        const itemName = item.name;
        window.open(item.link, "_blank");
        // console.log(item.link);
    }
};

const animate = () => {
    //controls.update();

    moveZ += (targetZNum - moveZ) * 0.05;
    boxGroup.position.z = moveZ;

    moveX += (mouseX - moveX - WIDTH / 2) * 0.05;
    moveY += (mouseY - moveY - WIDTH / 2) * 0.05;

    boxGroup.position.x = -(moveX / 50);
    boxGroup.position.y = moveY / 50;

    camera.lookAt(scene.position);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
};

const stageResize = () => {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;

    camera.updateProjectionMatrix();
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    //카메라 비율을 화면 비율에 맞춘다
};

let scrolly = 0;
let pageNum = 0;
const progressBar = document.querySelector(".bar");
let perNum = 0;

const scrollFunc = () => {
    scrolly = window.scrollY; //현재 스크롤 위치
    pageNum = Math.ceil(scrolly / 200); //스크롤 한번에 100 이동
    targetZNum = depthNum * pageNum;

    perNum = Math.ceil(
        (scrolly / (document.body.offsetHeight - window.innerHeight)) * 100
    );
    progressBar.style.width = perNum + "%";

    console.log(targetZNum, window.scrollY, pageNum);
};

init();
animate();
window.addEventListener("resize", stageResize);
window.addEventListener("wheel", scrollFunc);
window.addEventListener("scroll", scrollFunc);
scrollFunc();

window.addEventListener("mousemove", (e) => {
    //console.log(e);
    mouseX = e.clientX;
    mouseY = e.clientY;
});

window.addEventListener("pointermove", onPointerMove);
window.addEventListener("mousedown", onDocumentMouseDown);
