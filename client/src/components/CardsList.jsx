import { forwardRef, memo } from 'react' 
import { FixedSizeList as List, areEqual } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import memoize from 'memoize-one'
import { getBackgroundColorByNucleo } from '../services/colors'
import CardBrick, { CardBrickSkeleton } from '../components/CardBrick'

export default function CardsList({
  rows,
  hasNextPage,
  isNextPageLoading,
  loadNextPage,
  columnsQnt,
  listHeight,
  rowHeight
}) {

  const RowSkeleton = Array.from(Array(columnsQnt).keys()).map((key) => 
    <CardBrickSkeleton key={key}/>
  )

  const itemCount = hasNextPage ? rows.length + 1 : rows.length

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  const isItemLoaded = index => !hasNextPage || index < rows.length

  const itemData = createItemData(rows, RowSkeleton, isItemLoaded)

  return (
    <InfiniteLoader
      itemCount={itemCount}
      loadMoreItems={loadMoreItems}
      isItemLoaded={isItemLoaded}
    >
      {({ onItemsRendered, ref}) => (
        <List
          height={listHeight}
          itemSize={rowHeight}
          itemData={itemData}
          itemCount={itemCount}
          innerElementType={innerElementType}
          onItemsRendered={onItemsRendered}
          useIsScrolling
          ref={ref}
      
        >
          {Row}
        </List>
      )}
    </InfiniteLoader> 
  );
}

const createItemData = memoize((rows, RowSkeleton, isItemLoaded) => ({
  rows,
  RowSkeleton,
  isItemLoaded
}))

const Row = memo(({data, index, style, isScrolling}) => {
  const { rows, RowSkeleton, isItemLoaded } = data

  const columns = rows[index]

  return (
    <div style={style}>
      <div className="flex justify-center gap-3">
        {!isItemLoaded(index) || isScrolling 
          ? RowSkeleton 
          : columns.map((user) => (
            <CardBrick 
              key={user.id}
              color={getBackgroundColorByNucleo(user.department)}
              picture={user.picture}
              name={user.name}
              userId={user.id}
            />
          ))}
      </div>
    </div>
  )
}, areEqual)

const innerElementType = forwardRef(({style, ...rest}, ref) => (
  <div
    ref={ref}
    style={{
      ...style,
      margin: '0 auto',
      marginTop: '1rem',
      maxWidth: '95%',
      position: 'relative',
    }}
    {...rest}
  />
))