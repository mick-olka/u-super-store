import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ImageIcon from '@mui/icons-material/Image'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'

import { globalConfig } from 'src/utils'

const date_options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

export const orders_columns: GridColDef[] = [
  { field: 'name', headerName: "Ім'я", width: 130 },
  { field: 'status', headerName: 'Статус', width: 130 },
  {
    field: 'date',
    headerName: 'Дата',
    width: 130,
    valueFormatter: (v) =>
      new Date(v.value).toLocaleDateString('ua-UA', date_options as Intl.DateTimeFormatOptions),
  },
]

export const cart_item_columns: GridColDef[] = [
  {
    field: 'product',
    headerName: 'Товар',
    renderCell: (params) => (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {params.value?.thumbnail ? (
          <>
            <Box sx={{ width: '3rem', height: '3rem' }}>
              <Avatar
                alt={'R'}
                src={`${globalConfig.photosUrl}${params.value.thumbnail}`}
                sx={{ width: 100, height: 50 }}
                variant='square'
              />
            </Box>
          </>
        ) : (
          <ImageIcon />
        )}
        <Typography sx={{ marginLeft: '1rem' }}>
          {params.value ? params.value.name.ua : 'видалений товар'}
        </Typography>
      </Box>
    ),
    width: 300,
  },
  {
    field: 'count',
    headerName: 'К-ть',
    width: 130,
    align: 'center',
    headerAlign: 'center',
  },
  {
    field: 'main_color',
    headerName: 'Заголовок',
    width: 130,
    // editable: true,
    // renderCell: (params) => {
    //   // const value = useRef<string>(params.value)
    //   const [value, setValue] = useState(params.value)
    //   return (
    //     <TextField
    //       value={value}
    //       onChange={(e) => setValue(e.target.value)}
    //       onBlur={() => updateRows(value, params.row._id, params.field)}
    //       onKeyDown={(ev) => {
    //         if (ev.key === 'Enter') {
    //           updateRows(value, params.row._id, params.field)
    //         }
    //       }}
    //     />
    //   )
    // },
    // preProcessEditCellProps: (p) => {
    //   // console.log(p)
    //   return p
    // },
    // valueParser(value, params) {
    //   console.log(value, params)
    // },
    // valueSetter(v) {
    //   console.log(v)
    // },
  },
  { field: 'pill_color', headerName: 'Варіант', width: 130 },
  {
    field: 'edit',
    headerName: '',
    width: 50,
    renderCell: () => (
      <IconButton>
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
]
