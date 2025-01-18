import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateJobInput = {
  company: Scalars['String']['input'];
  description: Scalars['String']['input'];
  location: Scalars['String']['input'];
  position: Scalars['String']['input'];
  requirements: Array<Scalars['String']['input']>;
  salary: Scalars['Float']['input'];
  workArrangement: WorkArrangement;
};

export type Job = {
  __typename?: 'Job';
  company: Scalars['String']['output'];
  createdBy: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  position: Scalars['String']['output'];
  requirements: Array<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Float']['output']>;
  user?: Maybe<User>;
  workArrangement: WorkArrangement;
};

export type JobFilters = {
  company?: InputMaybe<Scalars['String']['input']>;
  createdBy?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  workArrangement?: InputMaybe<WorkArrangement>;
};

export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']['output']>;
  createJob: Job;
  deleteJob: Job;
  loginWithPhoneAndPassword: Authenticated;
  signupWithPhoneAndPassword: SignupResponse;
  updateJob: Job;
  updateUser: User;
  verifyOtp: Authenticated;
};


export type MutationCreateJobArgs = {
  data?: InputMaybe<CreateJobInput>;
};


export type MutationDeleteJobArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginWithPhoneAndPasswordArgs = {
  data?: InputMaybe<LoginInput>;
};


export type MutationSignupWithPhoneAndPasswordArgs = {
  data?: InputMaybe<SignupInput>;
};


export type MutationUpdateJobArgs = {
  data?: InputMaybe<UpdateJobInput>;
};


export type MutationUpdateUserArgs = {
  data?: InputMaybe<UpdateUserInput>;
};


export type MutationVerifyOtpArgs = {
  data?: InputMaybe<OtpInput>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']['output']>;
  auth?: Maybe<Authenticated>;
  getJob: Job;
  getJobs: Array<Maybe<Job>>;
  hello?: Maybe<Scalars['String']['output']>;
  me: User;
  user: User;
};


export type QueryGetJobArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetJobsArgs = {
  filters: JobFilters;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  _empty?: Maybe<Scalars['String']['output']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isAuthenticated?: Maybe<Scalars['Boolean']['output']>;
  jobs?: Maybe<Job>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export enum WorkArrangement {
  HYBRID = 'HYBRID',
  ON_SITE = 'ON_SITE',
  REMOTE = 'REMOTE'
}

export type Authenticated = {
  __typename?: 'authenticated';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type OtpInput = {
  code: Scalars['String']['input'];
};

export type SignupInput = {
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type SignupResponse = {
  __typename?: 'signupResponse';
  message?: Maybe<Scalars['String']['output']>;
};

export type UpdateJobInput = {
  company?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  requirements?: InputMaybe<Array<Scalars['String']['input']>>;
  salary?: InputMaybe<Scalars['Float']['input']>;
  workArrangement?: InputMaybe<WorkArrangement>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateJobInput: CreateJobInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Job: ResolverTypeWrapper<Job>;
  JobFilters: JobFilters;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  WorkArrangement: WorkArrangement;
  authenticated: ResolverTypeWrapper<Authenticated>;
  loginInput: LoginInput;
  otpInput: OtpInput;
  signupInput: SignupInput;
  signupResponse: ResolverTypeWrapper<SignupResponse>;
  updateJobInput: UpdateJobInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CreateJobInput: CreateJobInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Job: Job;
  JobFilters: JobFilters;
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  Subscription: {};
  UpdateUserInput: UpdateUserInput;
  User: User;
  authenticated: Authenticated;
  loginInput: LoginInput;
  otpInput: OtpInput;
  signupInput: SignupInput;
  signupResponse: SignupResponse;
  updateJobInput: UpdateJobInput;
};

export type JobResolvers<ContextType = any, ParentType extends ResolversParentTypes['Job'] = ResolversParentTypes['Job']> = {
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  position?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  requirements?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  salary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  workArrangement?: Resolver<ResolversTypes['WorkArrangement'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, Partial<MutationCreateJobArgs>>;
  deleteJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, RequireFields<MutationDeleteJobArgs, 'id'>>;
  loginWithPhoneAndPassword?: Resolver<ResolversTypes['authenticated'], ParentType, ContextType, Partial<MutationLoginWithPhoneAndPasswordArgs>>;
  signupWithPhoneAndPassword?: Resolver<ResolversTypes['signupResponse'], ParentType, ContextType, Partial<MutationSignupWithPhoneAndPasswordArgs>>;
  updateJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, Partial<MutationUpdateJobArgs>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, Partial<MutationUpdateUserArgs>>;
  verifyOtp?: Resolver<ResolversTypes['authenticated'], ParentType, ContextType, Partial<MutationVerifyOtpArgs>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  auth?: Resolver<Maybe<ResolversTypes['authenticated']>, ParentType, ContextType>;
  getJob?: Resolver<ResolversTypes['Job'], ParentType, ContextType, RequireFields<QueryGetJobArgs, 'id'>>;
  getJobs?: Resolver<Array<Maybe<ResolversTypes['Job']>>, ParentType, ContextType, RequireFields<QueryGetJobsArgs, 'filters'>>;
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  _empty?: SubscriptionResolver<Maybe<ResolversTypes['String']>, "_empty", ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isAuthenticated?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  jobs?: Resolver<Maybe<ResolversTypes['Job']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AuthenticatedResolvers<ContextType = any, ParentType extends ResolversParentTypes['authenticated'] = ResolversParentTypes['authenticated']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SignupResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['signupResponse'] = ResolversParentTypes['signupResponse']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Job?: JobResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  authenticated?: AuthenticatedResolvers<ContextType>;
  signupResponse?: SignupResponseResolvers<ContextType>;
};

