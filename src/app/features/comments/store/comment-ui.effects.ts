// /* eslint @ngrx/no-dispatch-in-effects: 0 */
// import { Injectable } from '@angular/core'
// import { MatDialogRef } from '@angular/material/dialog'
// import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects'
// import { Store } from '@ngrx/store'
// import { map, tap, filter } from 'rxjs/operators'
// import { DialogType } from 'src/app/shared/dialog/dialog-type.enum'
// import { DialogService } from 'src/app/shared/dialog/dialog.service'
// import {
//   DeletePostActions,
//   CreatePostActions,
//   UpdatePostActions,
//   CloseUpsertPostFormDialog,
//   RemovePostActions,
//   AddPostActions,
//   UpdatePostActions,
//   CloseUpsertPostFormDialog
// } from './post.actions'
// import { PostUpsertFormComponent } from '../components/post-comment-upsert-form/post-upsert-form.component'
// import { DialogConfirmationComponent } from 'src/app/shared/dialog-confirmation/dialog-confirmation'
// import { PostUpsertDialogData } from '../types/post-upsert-dialog-data'
// import { PostCreateDto } from '../dtos/post-comment-create-dto'
// import { PostUpdateDto } from '../dtos/post-comment-update-dto'
// import { Post } from '../interfaces/post.interface'
// import { selectIsLoadingPostAction, selectPostById } from './post-comment.selectors'
// import { selectPostById } from './post.selectors'
// import { Post } from '../interfaces/post.interface'
// import { PostCreateDto } from '../dtos/post-create-dto'
// import { PostUpsertFormComponent } from '../components/post-comment-upsert-form/post-upsert-form.component'
// import { PostUpsertDialogData } from '../types/post-comment-upsert-dialog-data'
// import { PostUpdateDto } from '../dtos/post-update-dto'

// @Injectable()
// export class PostUiEffects {
//   private postUpsertFormDialogRef: MatDialogRef<PostUpsertFormComponent>
//   private postUpsertFormDialogRef: MatDialogRef<PostUpsertFormComponent>
//   private confirmationDialogRef: MatDialogRef<DialogConfirmationComponent>

//   constructor(private actions$: Actions, private store: Store, private dialog: DialogService) {}

//   openPostCreateFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(CreatePostActions.openCreatePostDialog),
//         tap(
//           ({ eventId }) =>
//             (this.postUpsertFormDialogRef = this.dialog.openForm<PostUpsertFormComponent, PostUpsertDialogData>(
//               PostUpsertFormComponent,
//               {
//                 type: DialogType.FORM,
//                 data: {
//                   title: 'Create New Post List',
//                   submitText: 'Create',
//                   type: 'create',
//                   onSubmit: (post: PostCreateDto) =>
//                     this.store.dispatch(CreatePostActions.createPost({ eventId, post }))
//                 }
//               }
//             ))
//         )
//       )
//     },
//     { dispatch: false }
//   )

//   openPostUpdateFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(UpdatePostActions.openUpdatePostDialog),
//         concatLatestFrom(({ postId }) => this.store.select(selectPostById({ postId }))),
//         filter(([, post]) => !!post),
//         map(([, post]) => post as Post),
//         tap(
//           (post) =>
//             (this.postUpsertFormDialogRef = this.dialog.openForm<PostUpsertFormComponent, PostUpsertDialogData>(
//               PostUpsertFormComponent,
//               {
//                 type: DialogType.FORM,
//                 data: {
//                   post,
//                   title: `Edit ${post.name}`,
//                   submitText: 'Save Changes',
//                   type: 'update',
//                   onSubmit: (updates: PostUpdateDto) =>
//                     this.store.dispatch(
//                       UpdatePostActions.updatePost({
//                         eventId: post.eventId,
//                         postId: post.id,
//                         post: updates
//                       })
//                     )
//                 }
//               }
//             ))
//         )
//       )
//     },
//     { dispatch: false }
//   )

//   closePostUpsertFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(CloseUpsertPostFormDialog, UpdatePostActions.updatePostSuccess, CreatePostActions.createPostSuccess),
//         tap(() => this.postUpsertFormDialogRef.close())
//       )
//     },
//     { dispatch: false }
//   )

//   openDeletePostDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(DeletePostActions.openDeletePostDialog),
//         concatLatestFrom(({ postId }) => this.store.select(selectPostById({ postId }))),
//         filter(([, post]) => !!post),
//         map(([, post]) => post as Post),
//         tap(({ id: postId, eventId }) => {
//           this.confirmationDialogRef = this.dialog.openConfirmationDialog({
//             type: 'error',
//             title: 'You are about to delete a post list?',
//             message: 'You will not be able to add new posts to this post list',
//             primaryCTA: 'Delete Post List',
//             onSubmit: () => this.store.dispatch(DeletePostActions.deletePost({ eventId, postId })),
//             isLoading$: this.store.select(selectIsLoadingPostAction)
//           })
//         })
//       )
//     },
//     { dispatch: false }
//   )

//   openPostAddFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(AddPostActions.openAddPostDialog),
//         tap(
//           ({ eventId, postId, postName }) =>
//             (this.postUpsertFormDialogRef = this.dialog.openForm<PostUpsertFormComponent, PostUpsertDialogData>(
//               PostUpsertFormComponent,
//               {
//                 type: DialogType.FORM,
//                 data: {
//                   title: `Add New Post to ${postName}`,
//                   submitText: 'Add',
//                   type: 'create',
//                   onSubmit: (post: PostCreateDto) =>
//                     this.store.dispatch(AddPostActions.addPost({ eventId, postId, post }))
//                 }
//               }
//             ))
//         )
//       )
//     },
//     { dispatch: false }
//   )

//   openPostUpdateFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(UpdatePostActions.openUpdatePostDialog),
//         concatLatestFrom(({ postId }) => this.store.select(selectPostById({ postId }))),
//         filter(([_, post]) => !!post),
//         map(([action, post]) => [action, post] as [typeof action, Post]),
//         tap(
//           ([{ eventId, postId }, post]) =>
//             (this.postUpsertFormDialogRef = this.dialog.openForm<PostUpsertFormComponent, PostUpsertDialogData>(
//               PostUpsertFormComponent,
//               {
//                 type: DialogType.FORM,
//                 data: {
//                   title: `Update ${post.name}`,
//                   submitText: 'Save Changes',
//                   type: 'update',
//                   post,
//                   onSubmit: (updates: PostUpdateDto) =>
//                     this.store.dispatch(
//                       UpdatePostActions.updatePost({ eventId, postId, postId: post.id, post: updates })
//                     )
//                 }
//               }
//             ))
//         )
//       )
//     },
//     { dispatch: false }
//   )

//   closePostUpsertFormDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(CloseUpsertPostFormDialog, AddPostActions.addPostSuccess, UpdatePostActions.updatePostSuccess),
//         tap(() => this.postUpsertFormDialogRef.close())
//       )
//     },
//     { dispatch: false }
//   )

//   openDeletePostDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(RemovePostActions.openRemovePostDialog),
//         concatLatestFrom(({ postId }) => this.store.select(selectPostById({ postId }))),
//         filter(([, post]) => !!post),
//         map(([{ eventId, postId }, post]) => ({ post: post as Post, postId, eventId })),
//         tap(({ post, postId, eventId }) => {
//           this.confirmationDialogRef = this.dialog.openConfirmationDialog({
//             type: 'error',
//             title: `You are about to delete ${post.name}?`,
//             message: 'You will not be able to view events in this post anymore!',
//             primaryCTA: 'Remove Post',
//             onSubmit: () => this.store.dispatch(RemovePostActions.removePost({ postId: post.id, postId, eventId })),
//             isLoading$: this.store.select(selectIsLoadingPostAction)
//           })
//         })
//       )
//     },
//     { dispatch: false }
//   )

//   closeConfirmationDialog$ = createEffect(
//     () => {
//       return this.actions$.pipe(
//         ofType(
//           DeletePostActions.deletePostError,
//           DeletePostActions.deletePostSuccess,
//           RemovePostActions.removePostError,
//           RemovePostActions.removePostSuccess
//         ),
//         tap(() => this.confirmationDialogRef.close())
//       )
//     },
//     { dispatch: false }
//   )
// }
