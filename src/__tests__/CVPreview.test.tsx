import CVPreview from '@/components/CVPreview/CVPreview';
import { render, screen } from '@testing-library/react'
jest.mock('@/components/CVPreview/LoadingPreview', () => {
  const LoadingPreview = () => <div>Loading</div>;
  return LoadingPreview;
});
jest.mock('@/components/pdf/downloadResumeButton', () => ({
  __esModule: true,
  DownloadResumeButton: () => <div>Mocked Download Button</div>
}));
jest.mock('@react-pdf/renderer', () => ({}));

jest.mock('@/components/AutoResizeTextArea', () => {
  return {
    __esModule: true,
    default: (props: React.ComponentProps<'textarea'>) => (
      <textarea {...props} data-testid="mocked-textarea" />
    ),
  };
});

describe('CVPreview', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders LoadingPreview when localStorage is empty', () => {
    render(<CVPreview />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
  it('renders CV info when localStorage has data', () => {
    const mockCV = {
      header: {
        fullName: "Sebastián Arcos",
        location: "Quito, Ecuador",
        phone: "0984332416",
        email: "sebasarcose@hotmail.com",
        linkedin: "https://www.linkedin.com/in/sebastian-arcos-echeverria-b10005360"
      },
      summary:
        "I am a dedicated systems engineer with a strong foundation in designing and implementing robust applications, primarily using modern technologies like React, Node.js, and Next.js. My experience at From Digital has honed my skills in developing and optimizing software solutions to meet complex business needs. I am committed to continuous learning, particularly in the fields of data analysis and machine learning, which allows me to stay at the forefront of technological advancements.",
      experience: [
        {
          jobTitle: "Systems Engineer",
          employer: "From Digital",
          location: "Quito, Ecuador",
          startDate: "2023-01-01",
          endDate: "2025-06-05",
          bullets: [
            "Designed and implemented scalable applications using React, Node.js, Express, and Next.js, enhancing system performance by 30%.",
            "Collaborated with cross-functional teams to deliver high-quality software solutions, resulting in a 20% increase in client satisfaction.",
            "Streamlined application development processes, reducing deployment time by 25% through automation and efficient code practices.",
            "Integrated machine learning models to improve data analysis capabilities within applications, leading to more accurate business insights.",
            "Mentored junior developers, fostering a collaborative team environment and improving overall team productivity by 15%."
          ]
        }
      ],
      education: [
        {
          institution: "Pontificia Universidad Católica del Ecuador",
          degree: "Information Systems Engineering",
          startDate: "2023-05-01",
          graduationDate: "2025-06-17"
        }
      ],
      skills: {
        languages: ["Spanish"],
        technical: ["React", "Node.js", "Express", "Next.js", "Python", "Machine Learning"],
        softSkills: ["Problem Solving", "Team Collaboration", "Continuous Learning"]
      }
    };

    localStorage.setItem('generatedCV', JSON.stringify(mockCV));
    render(<CVPreview />);
    expect(screen.getByDisplayValue('Sebastián Arcos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('sebasarcose@hotmail.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Systems Engineer')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Pontificia Universidad Católica del Ecuador')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Information Systems Engineering')).toBeInTheDocument();
    expect(screen.getByDisplayValue('I am a dedicated systems engineer with a strong foundation in designing and implementing robust applications, primarily using modern technologies like React, Node.js, and Next.js. My experience at From Digital has honed my skills in developing and optimizing software solutions to meet complex business needs. I am committed to continuous learning, particularly in the fields of data analysis and machine learning, which allows me to stay at the forefront of technological advancements.')).toBeInTheDocument();
  })
});