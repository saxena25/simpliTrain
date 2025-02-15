import { Flex , Progress } from "antd";
import CircleOutline from '../../../components/icons/circleOutline';
import { useState } from "react";

const modules = [
    { name: "1. This quiz is designed to test your understanding.", description: "8 / 10 Points", details: 'Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'},
    {
      name: "2. It contains 7 modules , covering different topics.",
      description: "12 / 10 Points", details: 'Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
    },
    {
      name: "3. The quiz include mix of question types.",
      description: "24 /10 Points", details: 'Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'

    },
    {
      name: "4. Each question carries points.",
      description: "10 / 10 Points", details: 'Instructor Comments : Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries'
    },
  ];
  

export default function Result() {

    const [showDetails, setShowDetails] = useState(null);

    const toggleDetails = (index) => {
      setShowDetails((prev) => (prev === index ? null : index));
    };

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center grow overflow-y-auto">
        <div className="w-[95%] py-6 flex flex-col justify-center items-center rounded-[24px] pl-4 pr-2 bg-[#F4F4F4]">
          <svg
            width="54"
            height="54"
            viewBox="0 0 54 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M27 45C29.8125 45 32.2031 44.0156 34.1719 42.0469C36.1406 40.0781 37.125 37.6875 37.125 34.875C37.125 32.0625 36.1406 29.6719 34.1719 27.7031C32.2031 25.7344 29.8125 24.75 27 24.75C24.1875 24.75 21.7969 25.7344 19.8281 27.7031C17.8594 29.6719 16.875 32.0625 16.875 34.875C16.875 37.6875 17.8594 40.0781 19.8281 42.0469C21.7969 44.0156 24.1875 45 27 45ZM20.4187 21.825C21.1687 21.4125 21.9656 21.0844 22.8094 20.8406C23.6531 20.5969 24.5063 20.4375 25.3687 20.3625L19.6875 9H14.0625L20.4187 21.825ZM33.5812 21.825L39.9937 9H34.3125L29.5312 18.5625L30.6 20.7C31.125 20.85 31.6312 21.0094 32.1187 21.1781C32.6062 21.3469 33.0938 21.5625 33.5812 21.825ZM14.4 42.3C13.7625 41.2125 13.2656 40.0406 12.9094 38.7844C12.5531 37.5281 12.375 36.225 12.375 34.875C12.375 33.525 12.5531 32.2219 12.9094 30.9656C13.2656 29.7094 13.7625 28.5375 14.4 27.45C12.825 27.975 11.5312 28.9031 10.5187 30.2344C9.50625 31.5656 9 33.1125 9 34.875C9 36.6375 9.50625 38.1844 10.5187 39.5156C11.5312 40.8469 12.825 41.775 14.4 42.3ZM39.6 42.3C41.175 41.775 42.4688 40.8469 43.4813 39.5156C44.4937 38.1844 45 36.6375 45 34.875C45 33.1125 44.4937 31.5656 43.4813 30.2344C42.4688 28.9031 41.175 27.975 39.6 27.45C40.2375 28.5375 40.7344 29.7094 41.0906 30.9656C41.4469 32.2219 41.625 33.525 41.625 34.875C41.625 36.225 41.4469 37.5281 41.0906 38.7844C40.7344 40.0406 40.2375 41.2125 39.6 42.3ZM27 49.5C25.5 49.5 24.0656 49.2844 22.6969 48.8531C21.3281 48.4219 20.0625 47.8312 18.9 47.0812C18.5625 47.1562 18.225 47.2031 17.8875 47.2219C17.55 47.2406 17.1937 47.25 16.8187 47.25C13.4062 47.25 10.5 46.05 8.1 43.65C5.7 41.25 4.5 38.3438 4.5 34.9312C4.5 31.6687 5.5875 28.875 7.7625 26.55C9.9375 24.225 12.6187 22.9312 15.8062 22.6687L6.75 4.5H22.5L27 13.5L31.5 4.5H47.25L38.25 22.5562C41.4375 22.8562 44.1094 24.1687 46.2656 26.4937C48.4219 28.8187 49.5 31.6125 49.5 34.875C49.5 38.325 48.3 41.25 45.9 43.65C43.5 46.05 40.575 47.25 37.125 47.25C36.7875 47.25 36.4406 47.2406 36.0844 47.2219C35.7281 47.2031 35.3812 47.1562 35.0437 47.0812C33.8812 47.8312 32.625 48.4219 31.275 48.8531C29.925 49.2844 28.5 49.5 27 49.5ZM22.8375 41.0625L24.4125 35.9437L20.25 32.9625H25.3687L27 27.5625L28.6312 32.9625H33.75L29.5875 35.9437L31.1625 41.0625L27 37.9125L22.8375 41.0625Z"
              fill="#5F6368"
            />
          </svg>

        <h1 className="w-[50%] text-xl font-semibold text-center py-2">
          Congratulations
        </h1>
        <h2 className="text-lg text-gray-400 font-medium py-2">Time's Up! Your quiz has been successfully submitted.</h2>

        <svg width="201" height="30" viewBox="0 0 201 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="200.5" height="30" rx="15" fill="#585858"/>
            <path d="M18 15L21 18L27.5 12" stroke="white" strokeWidth="2"/>
            <path d="M41.58 16.296L37.66 9.432H39.42L41.996 14.056C42.156 14.328 42.252 14.552 42.38 14.824C42.524 14.536 42.556 14.44 42.764 14.056L45.324 9.432H47.036L43.148 16.296V21H41.58V16.296ZM46.201 17.08C46.201 14.664 47.929 12.968 50.281 12.968C52.617 12.968 54.345 14.664 54.345 17.08C54.345 19.496 52.617 21.192 50.281 21.192C47.929 21.192 46.201 19.496 46.201 17.08ZM47.721 17.08C47.721 18.712 48.761 19.848 50.281 19.848C51.785 19.848 52.841 18.712 52.841 17.08C52.841 15.448 51.785 14.312 50.281 14.312C48.761 14.312 47.721 15.448 47.721 17.08ZM61.2304 13.176H62.7184V21H61.3744L61.2144 19.816C60.7664 20.632 59.7264 21.192 58.5744 21.192C56.7504 21.192 55.7264 19.96 55.7264 18.04V13.176H57.2304V17.544C57.2304 19.224 57.9504 19.864 59.1024 19.864C60.4784 19.864 61.2304 18.984 61.2304 17.304V13.176ZM70.7795 20.984H69.2755V9.224H70.7795V14.376C71.2755 13.528 72.2195 12.952 73.4355 12.952C75.4355 12.952 76.3955 14.216 76.3955 16.216V21H74.8915V16.552C74.8915 14.968 74.1395 14.328 73.0195 14.328C71.5635 14.328 70.7795 15.384 70.7795 16.728V20.984ZM80.7666 21.192C79.0866 21.192 78.0946 20.248 78.0946 18.824C78.0946 17.384 79.1666 16.488 81.0066 16.344L83.4706 16.152V15.928C83.4706 14.616 82.6866 14.152 81.6306 14.152C80.3666 14.152 79.6466 14.712 79.6466 15.656H78.3346C78.3346 14.024 79.6786 12.952 81.6946 12.952C83.6306 12.952 84.9426 13.976 84.9426 16.088V21H83.6626L83.5026 19.736C83.1026 20.632 82.0306 21.192 80.7666 21.192ZM81.1986 20.024C82.6226 20.024 83.4866 19.096 83.4866 17.624V17.208L81.4866 17.368C80.1586 17.496 79.6146 18.008 79.6146 18.776C79.6146 19.608 80.2226 20.024 81.1986 20.024ZM88.905 21L85.753 13.176H87.353L89.065 17.544C89.337 18.28 89.561 18.936 89.689 19.416C89.817 18.904 90.073 18.232 90.345 17.544L92.089 13.176H93.657L90.393 21H88.905ZM97.8703 21.192C95.5663 21.192 93.9823 19.528 93.9823 17.096C93.9823 14.648 95.5343 12.952 97.8063 12.952C100.03 12.952 101.486 14.488 101.486 16.808V17.368L95.4383 17.384C95.5503 19.032 96.4143 19.944 97.9023 19.944C99.0703 19.944 99.8383 19.464 100.094 18.568H101.502C101.118 20.248 99.8063 21.192 97.8703 21.192ZM97.8063 14.216C96.4943 14.216 95.6623 15 95.4703 16.376H99.9823C99.9823 15.08 99.1343 14.216 97.8063 14.216ZM112.597 21.176C109.301 21.176 107.109 18.808 107.109 15.224C107.109 11.656 109.365 9.24 112.677 9.24C115.285 9.24 117.285 10.792 117.717 13.16H116.037C115.605 11.656 114.309 10.744 112.629 10.744C110.293 10.744 108.757 12.504 108.757 15.208C108.757 17.912 110.293 19.672 112.629 19.672C114.325 19.672 115.669 18.76 116.101 17.336H117.765C117.269 19.64 115.205 21.176 112.597 21.176ZM118.92 17.08C118.92 14.664 120.648 12.968 123 12.968C125.336 12.968 127.064 14.664 127.064 17.08C127.064 19.496 125.336 21.192 123 21.192C120.648 21.192 118.92 19.496 118.92 17.08ZM120.44 17.08C120.44 18.712 121.48 19.848 123 19.848C124.504 19.848 125.56 18.712 125.56 17.08C125.56 15.448 124.504 14.312 123 14.312C121.48 14.312 120.44 15.448 120.44 17.08ZM130.233 21H128.729V13.176H130.073L130.217 14.2C130.617 13.464 131.449 12.952 132.553 12.952C133.769 12.952 134.633 13.56 135.033 14.536C135.401 13.56 136.345 12.952 137.561 12.952C139.353 12.952 140.441 14.072 140.441 15.88V21H138.969V16.248C138.969 15.016 138.281 14.312 137.225 14.312C136.089 14.312 135.337 15.112 135.337 16.36V21H133.849V16.232C133.849 15 133.177 14.328 132.121 14.328C130.985 14.328 130.233 15.112 130.233 16.36V21ZM142.526 24.504V13.176H143.886L143.998 14.584C144.526 13.512 145.582 12.952 146.83 12.952C149.07 12.952 150.462 14.632 150.462 17.032C150.462 19.416 149.15 21.208 146.83 21.208C145.582 21.208 144.542 20.68 144.03 19.72V24.504H142.526ZM144.046 17.096C144.046 18.696 144.974 19.848 146.51 19.848C148.046 19.848 148.958 18.696 148.958 17.096C148.958 15.48 148.046 14.328 146.51 14.328C144.974 14.328 144.046 15.464 144.046 17.096ZM153.655 21H152.151V9.224H153.655V21ZM159.245 21.192C156.941 21.192 155.357 19.528 155.357 17.096C155.357 14.648 156.909 12.952 159.181 12.952C161.405 12.952 162.861 14.488 162.861 16.808V17.368L156.813 17.384C156.925 19.032 157.789 19.944 159.277 19.944C160.445 19.944 161.213 19.464 161.469 18.568H162.877C162.493 20.248 161.181 21.192 159.245 21.192ZM159.181 14.216C157.869 14.216 157.037 15 156.845 16.376H161.357C161.357 15.08 160.509 14.216 159.181 14.216ZM166.671 21H165.167V14.44H163.631V13.176H165.167V10.728H166.671V13.176H168.207V14.44H166.671V21ZM172.855 21.192C170.551 21.192 168.967 19.528 168.967 17.096C168.967 14.648 170.519 12.952 172.791 12.952C175.015 12.952 176.471 14.488 176.471 16.808V17.368L170.423 17.384C170.535 19.032 171.399 19.944 172.887 19.944C174.055 19.944 174.823 19.464 175.079 18.568H176.487C176.103 20.248 174.791 21.192 172.855 21.192ZM172.791 14.216C171.479 14.216 170.647 15 170.455 16.376H174.967C174.967 15.08 174.119 14.216 172.791 14.216ZM181.286 21.192C179.015 21.192 177.639 19.496 177.639 17.112C177.639 14.712 179.031 12.952 181.351 12.952C182.551 12.952 183.559 13.48 184.087 14.44V9.224H185.575V21H184.231L184.103 19.576C183.591 20.648 182.535 21.192 181.286 21.192ZM181.591 19.832C183.127 19.832 184.071 18.696 184.071 17.064C184.071 15.464 183.127 14.312 181.591 14.312C180.055 14.312 179.159 15.464 179.159 17.064C179.159 18.68 180.055 19.832 181.591 19.832Z" fill="white"/>
        </svg>

        <div className="w-[85%] flex flex-row grow justify-evenly items-center gap-12 py-6">
            <div className="flex flex-col items-center justify-center py-2 mt-2">
                <Flex gap="small" wrap>
                <Progress
                    strokeColor="orange"
                    type="circle"
                    size={130}
                    percent={60}
                    format={(percent) => (
                    <div className="flex flex-col items-center">
                        <span className="font-medium text-4xl">{percent}</span>
                        <span className="text-sm font-medium">Points</span>
                    </div>
                    )}/>            
                </Flex>
                <p className="text-center text-md py-2 font-bold">Meets Expectations</p>
            </div>
            <div className="w-full grid grid-cols-1 gap-4">
                {modules.map((module , index) => {
                    return (
                        <div className="flex flex-col justify-center items-center border-b-[1px] border-gray-400 p-2">
                        <div className="w-full flex flex-row justify-between p-2">
                            <p className="w-[75%] font-medium text-gray-400">{module.name}</p>
                            <p className="w-[20%] font-medium px-2">{module.description}</p>
                            <button onClick={() => toggleDetails(index)} className="w-[5%]"><svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7.5 7L14 1" stroke="black" strokeWidth="2"/>
                                </svg>
                            </button>
                        </div>
                        {showDetails === index && (
              <p className="mt-2 text-sm text-gray-600">{module.details}</p>
            )}
                        </div>
                    )
                })}
            </div>        
        </div>
        <div className="flex flex-row justify-evenly w-[70%]">
            <div className="flex flex-col items-center justify-center">
            <CircleOutline className="bg-red-500"/>
            <div className="flex flex-col items-center justify-center">
                <span className="font-medium text-sm">Need Improvement</span>
                <span className="text-sm font-medium">Below 50%</span>
            </div>
            </div>
        <div className="flex flex-col items-center justify-center">
            <CircleOutline className="bg-orange-400"/>
            <div className="flex flex-col items-center justify-center">
                <span className="font-medium text-sm">Meets Expectations</span>
                <span className="text-sm font-medium">50% - 70%</span>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center">
            <CircleOutline className="bg-green-500"/>
            <div className="flex flex-col items-center justify-center">
                <span className="font-medium text-sm">Exceeds Expectations</span>
                <span className="text-sm font-medium">(Above 70%)</span>
            </div>
        </div>
        </div>
      </div>
      <div className='w-[80%] flex flex-col justify-center items-center'>
        <h1 className="w-[40%] text-3xl font-medium text-center pt-6">
          Programming with JAVA Primary Assignment
        </h1>  
        <h2 className="text-sm text-gray-400 font-medium py-1">
        Course : Course Title
        </h2>
        <div className="w-full grid grid-cols-1 gap-4">
                <div className="flex flex-row justify-between p-2">
                  <p className="font-medium text-primary">
                    Evaluation Criteria
                  </p>
                  <p className="font-medium px-2">Total 100 Points</p>
                </div>
                {modules.map((module) => {
                  return (
                    <div className="flex flex-row justify-between p-2">
                      <p className="text-primary">{module.name}</p>
                      <p className="font-medium px-2">{module.description}</p>
                    </div>
                  );
                })}
              </div>  
      </div>
    </div>
          <footer className="w-full flex justify-center items-center p-4 bg-white sticky bottom-0 border-t-[1px] border-gray-300 mt-2">
            <div className="w-full flex flex-row justify-center items-center pt-3">
                <button className="w-max px-4 h-12 text-secondary font-medium bg-gray-300 rounded-[13px] mr-8"> Download Starter Files</button> 
                <button className="w-max px-4 h-12 text-white font-medium bg-secondary border border-gray-800 rounded-[13px]">Upload Solutions</button>
            </div>
          </footer>
    </>
  );
}
