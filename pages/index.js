import Menu from '../components/Menu'
import Topbar from '../components/Topbar'
import ContentArea from '../components/ContentArea'
import CourseSummary from '../components/CourseSummary'
import TodaysActivity from '../components/TodaysActivity'

function home(){
    return (
        <div>
            <Topbar />
            <div className="flex flex-row">
                <Menu />
                <ContentArea>
                    <TodaysActivity />
                    <CourseSummary />
                </ContentArea>
            </div>
        </div>
    )
}


export default home