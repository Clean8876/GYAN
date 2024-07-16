import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Coursecard from '../components/common/cataglog/Coursecard';
import { categories } from '../services/api';
import { apiConnector } from '../services/apiconnector';
import { getCatalogPageData } from '../services/operations/PageandComponent';

function Catalog() {
    const { catalogName } = useParams();
    const [categoryId, setCategoryId] = useState(null);
    const [category, setCategory] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await apiConnector("GET", categories.CATEGORIES_API);
                const transformedCatalogName = catalogName.split(" ").join("-").toLowerCase();
                const foundCategory = res.data.find(
                    (ct) => ct.name.split(" ").join("-").toLowerCase() === transformedCatalogName
                );
                if (foundCategory) {
                    setCategoryId(foundCategory._id);
                    setCategory(foundCategory);
                } else {
                    console.log("Category not found for catalogName:", transformedCatalogName);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        const fetchCourses = async () => {
            if (categoryId) {
                try {
                    const coursesData = await getCatalogPageData(categoryId);
                    console.log('Fetched courses data:', coursesData);
                    setCourses(coursesData?.data?.selectedCategory?.course || []);
                } catch (error) {
                    console.error("Error fetching courses:", error);
                    setCourses([]);
                }
            }
        };
        fetchCourses();
    }, [categoryId]);

    return (
        <div>
            <div className="box-content bg-white px-4">
                <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
                    <p className="text-sm text-black">
                        {`Home / Catalog /`}
                        <span className="text-black">{category?.name}</span>
                    </p>
                    <p className="text-3xl text-richblack-5">{category?.name}</p>
                    <p className="max-w-[870px] text-richblack-200">{category?.description}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                
                 {Array.isArray(courses) ? (
                    courses.map((course, index) => (
                        <Coursecard course={course} key={index} Height={"h-[220px]"} />
                    ))
                ) : (
                    <p>No courses available</p>
                )}
            </div>
        </div>
    );
}

export default Catalog;
