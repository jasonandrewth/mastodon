import {useRef, useEffect} from 'react'
import * as THREE from 'three';




const Vis = () => {

  const vertex = `
  precision mediump float;
  varying vec2 vUv;
                       
  void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix *    vec4(position, 1.0);
  }`;

  const fragment = `
  #ifdef GL_ES
  precision highp float;
  #endif
  
  #define PI2 6.28318530718
  #define MAX_ITER 5
  
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float spectrum;
  
  
  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      float uTime = uTime * .12;
      vec2 uv = fragCoord.xy / uResolution.xy;
  
      vec2 p = mod(uv * PI2, PI2) - 100.0  ;
      vec2 i = vec2(p);
      float c = 0.5;
      float inten =  .0094;
  
      for (int n = 0; n < MAX_ITER; n++) {
          float t = uTime * (4.5 - (2.2 / float(n + 122)));
          i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x))* uMouse.x*0.6;
          c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten + spectrum), p.y / (cos(i.y + t) / inten)));
      }
  
      c /= float(MAX_ITER);
      c = 1.10-pow(c, 1.26);
      vec3 colour = vec3(0.098, .098+pow(abs(c), 4.1), 0.098);
  
      fragColor = vec4(colour, 1.3);
  }
  
  
  void main( void ) {
      mainImage(gl_FragColor, gl_FragCoord.xy);}
  `;



  const mount = useRef(null)
  const controls = useRef(null)

  const mouse = new THREE.Vector2();

  useEffect(() => {
    let width = window.innerWidth
    let height = window.innerHeight


    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.PlaneBufferGeometry(30, 10);
    const clock = new THREE.Clock;

    const material = new THREE.ShaderMaterial({
      vertexShader: vertex,
      fragmentShader: fragment,
      // Uniforms
      uniforms: {
        uTime: { value: 0.0 },
        uResolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        uMouse: { value: { x: 0, y: 0 } },
        uColor: { value: new THREE.Color(0xffffff) }
      },
      wireframe: false
    });

    const material2 = new THREE.MeshBasicMaterial({color: 0xff0000})

    //Mesh
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(0, 0, 0);

    //Light
    const light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    light.lookAt(plane.position);

    // Camera
    const fov = 45;
    // const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 800))) / Math.PI
    //const fov = 2*(180/Math.PI)*Math.atan(heightTool/(2*dist));
    // const aspect = width / height
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10);
    camera.lookAt(plane.position);

    //Add to scene
    scene.add(camera)
    scene.add(plane)
    scene.add(light)

    //Renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(width, height)

    const mousemove = window.addEventListener('mousemove', (e) => {
      mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
	    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;
      material.uniforms.uMouse.value.x = mouse.x
    })


    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight

      material.uniforms.uResolution = {
        value: { x: window.innerWidth, y: window.innerHeight }
      };

      // width = mount.current.clientWidth
      // height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      // renderer.setSize(window.innerWidth, height)

      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }


    
    const animate = () => {

      material.uniforms.uTime.value = clock.getElapsedTime();

      window.requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }


    //SETUP
    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    animate()
    handleResize()

    //controls.current = { start, stop }
    
    return () => {
      material
    }
  }, [])

  // useEffect(() => {
  //   if (isAnimating) {
  //     controls.current.start()
  //   } else {
  //     controls.current.stop()
  //   }
  // }, [isAnimating])


  
  return (
    <div 
      className="vis" 
      ref={mount} 
      // onMouseEnter={hoverStateOn} 
      // onMouseLeave={hoverStateOff}
    />
  ) 
}

export default Vis