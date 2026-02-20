import {collections} from '@/lib/data';

// Declare global PptxGenJS on window
declare global {
  interface Window {
    PptxGenJS: any;
  }
}

export async function generateCompanyPresentation() {
  if (typeof window === 'undefined' || !window.PptxGenJS) {
    console.error('PptxGenJS not loaded');
    throw new Error('Presentation generator not ready. Please try again in a moment.');
  }

  const pptx = new window.PptxGenJS();

  // Set Metadata
  pptx.author = 'Wrap Weft & Co';
  pptx.company = 'Wrap Weft & Co';
  pptx.subject = 'Company Overview & Collections';
  pptx.title = 'Wrap Weft & Co - Premium Textile Supplier';

  // Define Layouts/Masters
  pptx.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: {color: 'F8FAFC'}, // slate-50
    objects: [
      {
        rect: {x: 0, y: 0, w: '100%', h: 0.75, fill: {color: '0F172A'}}, // slate-900 header
      },
      {
        text: {
          text: 'Wrap Weft & Co',
          options: {
            x: 0.5,
            y: 0.15,
            w: 5,
            h: 0.5,
            fontSize: 18,
            color: 'FFFFFF',
            fontFace: 'Times New Roman',
            bold: true,
          },
        },
      },
      {
        line: {x: 0.5, y: 6.8, w: '90%', h: 0, line: {color: 'CBD5E1', width: 1}}, // slate-300 footer line
      },
      {
        text: {
          text: 'Premium Denim & Sustainable Textiles',
          options: {
            x: 0.5,
            y: 6.9,
            w: 5,
            h: 0.3,
            fontSize: 10,
            color: '64748B', // slate-500
          },
        },
      },
      {
        slideNumber: {x: 9.0, y: 6.9, w: 0.5, h: 0.3, fontSize: 10, color: '64748B'},
      },
    ],
  });

  // 1. Title Slide
  const slide1 = pptx.addSlide();
  slide1.background = {color: '0F172A'}; // slate-900
  slide1.addText('Wrap Weft & Co', {
    x: 1,
    y: 2.5,
    w: '80%',
    h: 1,
    fontSize: 44,
    color: 'FFFFFF',
    align: 'center',
    fontFace: 'Times New Roman',
    bold: true,
  });
  slide1.addText('Weaving the Fabric of Modern Fashion', {
    x: 1,
    y: 3.5,
    w: '80%',
    h: 0.5,
    fontSize: 20,
    color: '94A3B8', // slate-400
    align: 'center',
  });
  slide1.addText('Est. 1985', {
    x: 1,
    y: 4.2,
    w: '80%',
    h: 0.3,
    fontSize: 14,
    color: '64748B', // slate-500
    align: 'center',
  });

  // 2. About Us
  const slide2 = pptx.addSlide({masterName: 'MASTER_SLIDE'});
  slide2.addText('Our Heritage', {
    x: 0.5,
    y: 1.0,
    w: '90%',
    h: 0.5,
    fontSize: 32,
    color: '0F172A',
    fontFace: 'Times New Roman',
    bold: true,
  });
  slide2.addText(
    'Founded in 1985, Wrap Weft & Co has grown from a single shuttle loom workshop into a global leader in premium textile manufacturing. We blend traditional craftsmanship with modern innovation.',
    {x: 0.5, y: 1.8, w: '45%', h: 4, fontSize: 14, color: '334155', align: 'justify'}
  );
  // Add placeholder for an image if we had local assets, for now using a shape
  slide2.addShape('rect', {x: 5.5, y: 1.8, w: 4, h: 3, fill: {color: 'E2E8F0'}});
  slide2.addText('Image: Vintage Loom', {x: 5.5, y: 3.2, w: 4, h: 0.5, align: 'center', fontSize: 12, color: '64748B'});

  // 3. Sustainability
  const slide3 = pptx.addSlide({masterName: 'MASTER_SLIDE'});
  slide3.addText('Sustainability Commitment', {
    x: 0.5,
    y: 1.0,
    w: '90%',
    h: 0.5,
    fontSize: 32,
    color: '0F172A',
    fontFace: 'Times New Roman',
    bold: true,
  });
  
  const sustainabilityPoints = [
    {title: 'Organic Materials', desc: '100% GOTS-certified organic cotton sourcing.'},
    {title: 'Water Stewardship', desc: 'Closed-loop filtration recycling 95% of water.'},
    {title: 'Renewable Energy', desc: 'Manufacturing facility powered by 80% solar energy.'},
    {title: 'Circular Economy', desc: 'Repurposing pre-consumer waste into new yarns.'},
  ];

  sustainabilityPoints.forEach((point, idx) => {
    const yPos = 2.0 + idx * 1.0;
    slide3.addText(point.title, {x: 0.5, y: yPos, w: 3, h: 0.4, fontSize: 16, bold: true, color: '1E3A8A'}); // blue-900
    slide3.addText(point.desc, {x: 0.5, y: yPos + 0.4, w: 8, h: 0.4, fontSize: 12, color: '475569'});
  });

  // 4. Collections Overview
  const slide4 = pptx.addSlide({masterName: 'MASTER_SLIDE'});
  slide4.addText('Our Collections', {
    x: 0.5,
    y: 1.0,
    w: '90%',
    h: 0.5,
    fontSize: 32,
    color: '0F172A',
    fontFace: 'Times New Roman',
    bold: true,
  });

  // Add a grid of collections
  collections.slice(0, 4).forEach((col, idx) => {
    const xPos = (idx % 2) * 4.5 + 0.5;
    const yPos = Math.floor(idx / 2) * 2.2 + 1.8;
    
    slide4.addText(col.title, {x: xPos, y: yPos, w: 4, h: 0.3, fontSize: 14, bold: true, color: '0F172A'});
    slide4.addText(col.category, {x: xPos, y: yPos + 0.3, w: 4, h: 0.2, fontSize: 10, color: '64748B', italic: true});
    slide4.addText(col.description, {x: xPos, y: yPos + 0.5, w: 4, h: 1, fontSize: 11, color: '334155'});
  });

  // 5. Contact
  const slide5 = pptx.addSlide({masterName: 'MASTER_SLIDE'});
  slide5.addText('Get in Touch', {
    x: 0.5,
    y: 1.0,
    w: '90%',
    h: 0.5,
    fontSize: 32,
    color: '0F172A',
    fontFace: 'Times New Roman',
    bold: true,
  });
  
  slide5.addText('Headquarters', {x: 1, y: 2.5, w: 3, h: 0.3, fontSize: 14, bold: true});
  slide5.addText('123 Textile Avenue\nGarment District, NY 10018\nUnited States', {x: 1, y: 2.9, w: 4, h: 1, fontSize: 12, color: '334155'});

  slide5.addText('Contact', {x: 5.5, y: 2.5, w: 3, h: 0.3, fontSize: 14, bold: true});
  slide5.addText('Email: hello@wrapweftco.com\nPhone: +1 (555) 123-4567', {x: 5.5, y: 2.9, w: 4, h: 1, fontSize: 12, color: '334155'});

  // Generate and save
  await pptx.writeFile({fileName: 'WrapWeftCo_Presentation.pptx'});
}
