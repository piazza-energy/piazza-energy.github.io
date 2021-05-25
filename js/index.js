(() => {
  const createNodes = (radius, deltaAngle) => {
    let data = [
      'battery',
      'buildings',
      'car',
      'fridge',
      'meter',
      'plug',
      'powerline',
      'solar',
      'wind'
    ];

    return data.map((value, index, array) => {
      let angle = (index / (array.length / 2) + deltaAngle) * Math.PI;
      let src = `img/${value}.svg`;
      let x = (0.8 * radius * Math.cos(angle)) + (radius - 75);
      let y = (0.8 * radius * Math.sin(angle)) + (radius - 75);
      return { value, src, index, angle, x, y };
    });
  }

  const initSVG = (width) => {
    let canvas = d3.select('#canvas');
    canvas.selectAll('svg').remove();
    return canvas
      .append('svg:svg')
      .attr('width', width)
      .attr('height', width);
  }

  const createElements = (container, nodes) => {
    container.selectAll()
      .data(nodes)
      .enter()
      .append('image')
      .attr('x', function(d, i) {
        return d.x;
      })
      .attr('y', function(d, i) {
        return d.y;
      })
      .attr('xlink:href', function(d, i) {
        return d.src;
      });
  }

  const initSizes = () => {
    const width = Math.round(0.9 * Math.min(window.innerWidth, window.innerHeight));
    const radius = 0.5 * width;

    let welcome = document.getElementById('welcome');
    welcome.style.width = '400px';
    welcome.style.top = `${Math.round(radius - 130)}px`
    welcome.style.left = `${Math.round(window.innerWidth / 2 - 200)}px`

    let canvas = document.getElementById('canvas');
    canvas.style.width = `${width}px`;
    return { width, radius };
  }

  const start = d3.now();

  const draw = () => {
    const speed = 0.00002;
    const deltaAngle = speed * (d3.now() - start);
    const sizes = initSizes();
    const container = initSVG(sizes.width);
    const nodes = createNodes(sizes.radius, deltaAngle);
    createElements(container, nodes);
  }

  window.addEventListener("resize", () => {
    draw();
  });

  draw();
  let t = d3.timer(() => {
    draw();
  }, 500);
})();
