import classNames from 'classnames/bind';

import styles from './MyWorkPage.module.scss';
import images from '~/assets/images';
import Search from '~/components/Search/Search';
import MyWorkItem from './MyWorkItem';
import TaskTableBody from '../TaskBoard/BodyTaskBoard/TaskTableBody';

const cx = classNames.bind(styles);

function MyWorkPage() {
    const dataTaskTableToday = JSON.parse(localStorage.getItem('dataTaskTableToday'));
    const dataTaskTableThisWeek = JSON.parse(localStorage.getItem('dataTaskTableThisWeek'));

    return (
        <div className={cx('my-work')}>
            <div className={cx('my-work-title')}>
                My work
                <div></div>
            </div>
            <div className={cx('my-work-body')}>
                <div className={cx('my-work-tool')}>
                    <Search key={2} placeholder={'Search'} iconRight={images.searchIcon} hover />
                    <input type="checkbox" />
                    <div>Hide done items</div>
                </div>
                <div>
                    <MyWorkItem icon={images.arrowRightIcon} title={'Past Dates'} items={0}></MyWorkItem>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'Today'}
                        items={dataTaskTableToday?.length > 0 ? dataTaskTableToday.length : 0}
                    >
                        {dataTaskTableToday?.length > 0 &&
                            dataTaskTableToday?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        indexTB={data.indexTB}
                                        key={data.indexParent}
                                        index={data.indexParent}
                                        indexTableItem={data.index}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                    <MyWorkItem
                        icon={images.arrowRightIcon}
                        title={'This Week'}
                        items={dataTaskTableThisWeek?.length > 0 ? dataTaskTableThisWeek.length : 0}
                    >
                        {dataTaskTableThisWeek?.length > 0 &&
                            dataTaskTableThisWeek?.map((data, index) => (
                                <div key={index} className={cx('my-work-items', index === 0 && 'first')}>
                                    <div></div>
                                    <TaskTableBody
                                        indexTB={data.indexTB}
                                        key={data.indexParent}
                                        index={data.indexParent}
                                        indexTableItem={data.index}
                                        lite
                                    />
                                </div>
                            ))}
                    </MyWorkItem>
                    <MyWorkItem icon={images.arrowRightIcon} title={'Next week'} items={0}></MyWorkItem>
                </div>
            </div>
        </div>
    );
}

export default MyWorkPage;
