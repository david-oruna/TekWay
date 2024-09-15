export interface Skill {
  name: string;
  logo: string; // Change this to string, not StaticImageData
}

export interface CareerPath {
  name: string;
  skills: Skill[];
}

export const careerPaths: Record<string, CareerPath> = {
  frontend: {
    name: 'Frontend Developer',
    skills: [
      { name: 'HTML', logo: '/images/logos/html.png' },  // Use direct path
      { name: 'CSS', logo: '/images/logos/css.png' },    // Use direct path
      { name: 'JavaScript', logo: '/images/logos/js.png' },  // Use direct path
      { name: 'React', logo: '/images/logos/react.png' },  // Use direct path
    ],
  },
  backend: {
    name: 'Backend Developer',
    skills: [
      { name: 'Node.js', logo: '/images/logos/node.png' },  // Use direct path
      { name: 'Python', logo: '/images/logos/python.png' }, // Use direct path
    ],
  },
  // ... add more career paths
};
