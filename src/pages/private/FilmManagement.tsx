/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Box, Button, ButtonGroup, Link, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import useData from '~/hooks/useData'
import { GridColDef } from '@mui/x-data-grid/models'
import { useState } from 'react'
import EditFilmModal from '~/components/modal/EditFilmModal'
import CreateFilmModal from '~/components/modal/CreateFilmModal'
import DeleteFilmModal from '~/components/modal/DeteleFilmModal'
// import CreateFilm from '~/components/Button/CreateFilm'
const FilmManagement = () => {
  const { films } = useData()

  const [openEditModal, setOpenEditModal] = useState(false)
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedFilmId, setSelectedFilmId] = useState<string | null>(null)

  const handleEditFilm = (id: string) => {
    setSelectedFilmId(id)
    setOpenEditModal(true)
  }
  const handleDeleteFilm = (id: string) => {
    setSelectedFilmId(id)
    setOpenDeleteModal(true)
  }
  const handleAddFilm = () => {
    setOpenCreateModal(true)
  }
  const handleCloseEditModal = () => {
    setOpenEditModal(false)
    setSelectedFilmId(null)
  }
  const handleCloseCreateModal = () => {
    setOpenCreateModal(false)
  }
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false)
  }
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, disableColumnMenu: true },
    {
      field: 'image',
      headerName: 'Image',
      width: 150,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => <img src={params.value} alt='film' width='100%' />
    },
    { field: 'title', headerName: 'Title', width: 150, disableColumnMenu: true },
    { field: 'year', headerName: 'Year', width: 90 },
    { field: 'nation', headerName: 'Nation', width: 100, disableColumnMenu: true },
    { field: 'description', headerName: 'Description', width: 580, disableColumnMenu: true },
    {
      field: 'trailer',
      headerName: 'Trailer',
      width: 100,
      renderCell: (param) => (
        <Link target='_blank' rel='noreferrer' href={param.value} sx={{ color: 'var(--primary-color)' }}>
          Link
        </Link>
      ),
      disableColumnMenu: true
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 100,
      renderCell: (params) => (
        <ButtonGroup variant='contained' aria-label='edit and delete buttons'>
          <Button sx={{ backgroundColor: 'var(--blue-color)' }} onClick={() => handleEditFilm(params.row.id)}>
            Edit
          </Button>
        </ButtonGroup>
      ),
      disableColumnMenu: true
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 100,
      renderCell: (params) => (
        <ButtonGroup variant='contained' aria-label='edit and delete buttons'>
          <Button color='error' onClick={() => handleDeleteFilm(params.row.id)}>
            Delete
          </Button>
        </ButtonGroup>
      ),
      disableColumnMenu: true
    }
  ]
  return (
    <Box sx={{ p: 5 }}>
      <Typography align='center' variant='h2' sx={{ mb: 5, color: 'var(--primary-color)', fontWeight: '600' }}>
        Management
      </Typography>
      <ButtonGroup sx={{ my: 2 }} variant='contained'>
        <Button color='primary' onClick={handleAddFilm}>
          Add new movie
        </Button>
      </ButtonGroup>
      <DataGrid
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } }
        }}
        pageSizeOptions={[5, 10, 25]}
        rowHeight={150}
        rows={films}
        columns={columns}
        sx={{
          color: 'white',
          fontSize: '1.2rem',
          '& .MuiTablePagination-caption': {
            color: 'white'
          },
          '& .MuiTablePagination-select': {
            color: 'white'
          },
          '& .MuiTablePagination-root': {
            color: 'white'
          }
        }}
      />
      <EditFilmModal open={openEditModal} handleClose={handleCloseEditModal} filmId={selectedFilmId} />
      <CreateFilmModal open={openCreateModal} handleClose={handleCloseCreateModal} />
      <DeleteFilmModal open={openDeleteModal} handleClose={handleCloseDeleteModal} filmId={selectedFilmId} />
    </Box>
  )
}

export default FilmManagement
