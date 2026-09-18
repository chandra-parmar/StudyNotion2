import { useState } from "react"
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md"
import { FaDesktop } from "react-icons/fa"

const CourseContent = ({ courseContent }) => {

    const [openSection, setOpenSection] = useState(null)

    const handleSectionClick = (sectionId) => {
        if (openSection === sectionId) {
            setOpenSection(null)
        } else {
            setOpenSection(sectionId)
        }
    }

    return (
        <div className="w-full border border-richblack-700 rounded-md overflow-hidden">

            {
                courseContent?.map((section, index) => {

                    const isOpen = openSection === section._id

                    return (
                        <div key={section._id}>

                            {/* SECTION HEADER */}
                            <div
                                onClick={() => handleSectionClick(section._id)}
                                className="flex items-center justify-between 
                                           bg-richblack-800 px-5 py-4 
                                           cursor-pointer border-b border-richblack-700"
                            >

                                <div className="flex items-center gap-2">

                                    {
                                        isOpen
                                            ? <MdKeyboardArrowUp size={22} />
                                            : <MdKeyboardArrowDown size={22} />
                                    }

                                    <p className="text-richblack-5 font-medium">
                                        {section.sectionName}
                                    </p>

                                </div>


                                <div className="flex items-center gap-4">

                                    <span className="text-yellow-50 text-sm">
                                        {section.subSection.length} lectures
                                    </span>

                                </div>

                            </div>


                            {/* LECTURES */}
                            {
                                isOpen && (

                                    <div className="bg-richblack-900">

                                        {
                                            section.subSection.map((subSection) => (

                                                <div
                                                    key={subSection._id}
                                                    className="flex items-center gap-3 
                                                               px-12 py-3 
                                                               border-b border-richblack-800"
                                                >

                                                    <FaDesktop
                                                        className="text-richblack-300"
                                                        size={14}
                                                    />

                                                    <p className="text-richblack-100 text-sm">
                                                        {subSection.title}
                                                    </p>

                                                </div>

                                            ))
                                        }

                                    </div>

                                )
                            }

                        </div>
                    )
                })
            }

        </div>
    )
}

export default CourseContent