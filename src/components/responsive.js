import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);

const layout = [
  { i: "1", x: 0, y: 0, w: 2, h: 1 },
  { i: "2", x: 1, y: 0, w: 1, h: 1 },
  { i: "3", x: 2, y: 0, w: 1, h: 1 },
  { i: "4", x: 3, y: 0, w: 1, h: 1 },
  { i: "5", x: 4, y: 0, w: 1, h: 1 }
];

// styled-components definition removed for brevity...
export default function Grid () {
  return (

      <ResponsiveGridLayout
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={300}
        width={1000}
      >
      
<div key='1'>
    a
</div>


<div key='2'>
    b
</div>
<div key='3'>
    c
</div>
<div key='4'>
    d
</div>
<div key='5'>
    j
</div>


      </ResponsiveGridLayout>
    
  );
};
